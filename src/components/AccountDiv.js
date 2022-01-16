import axios from "axios";
import React, { useState } from "react";
import Upi from "../assets/upi.svg";
import "../css/AccountDiv.css";
import { useForm } from "../utils/hooks.js";

export default function AccountDiv({ ...props }) {
	const initialState = {
		payments: "",
		address: "",
		phone: "",
	};
	const { onChange, onSubmit, values } = useForm(afterclick, initialState);

	const token = localStorage.getItem("access_token");
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingAddress, setIsLoadingAddress] = useState(false);

	function formValidation(value) {
		if (values.payments.trim() === "") {
			setErrors(["UPI ID Cannot be empty"]);
			return false;
		}
		const regex =
			/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z])+[a-zA-Z]{1,9})$/;
		if (!values.payments.match(regex)) {
			setErrors(["Please Enter a valid UPI ID"]);
			return false;
		}
		return true;
	}

	function formValidationAddress(value) {
		if (values.address.trim() === "") {
			setErrors(["UPI ID Cannot be empty"]);
			return false;
		}
		if (values.phone.trim() === "") {
			setErrors(["UPI ID Cannot be empty"]);
			return false;
		}
		return true;
	}

	function afterclick() {
		const headers = {
			Authorization: token ? `Bearer ${token}` : "",
		};
		if (formValidation(values)) {
			setIsLoading(true);
			axios
				.put("/users", values, { headers })
				.then((res) => {
					props.setComponentUpdated(!props.componentUpdated);
					setIsLoading(false);
					setErrors([]);
				})
				.catch((err) => setIsLoading(false));
		}
	}

	function afterclickAddress() {
		const headers = {
			Authorization: token ? `Bearer ${token}` : "",
		};
		if (formValidationAddress(values)) {
			setIsLoadingAddress(true);
			axios
				.put(
					"/users",
					{ address: values.address, phone: values.phone },
					{ headers }
				)
				.then((res) => {
					props.setComponentUpdated(!props.componentUpdated);
					setIsLoadingAddress(false);
					setErrors([]);
				})
				.catch((err) => setIsLoadingAddress(false));
		}
		// console.log(values)
	}

	function addAddress(e) {
		e.preventDefault();
		afterclickAddress();
	}

	return (
		<div className='accountcon'>
			<h5 className='upihead'>Payment Method</h5>
			<button
				type='button'
				className='upibut'
				data-bs-toggle='modal'
				data-bs-target='#exampleModalForAddress'>
				Add Address
			</button>
			<button
				type='button'
				className='upibut'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'>
				Update UPI
			</button>
			{props.payments === "" ? (
				<div className='upidiv'>
					<p>NO UPI ID associated with this account</p>
				</div>
			) : (
				<div className='upidiv'>
					<img src={Upi} alt='UPI' className='upiicon' />
					<p>{props.payments}</p>
				</div>
			)}
			<div
				className='modal fade'
				id='exampleModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								Enter UPI ID
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<form onSubmit={onSubmit}>
							<div className='modal-body'>
								<div className='input-group mb-3'>
									<input
										type='text'
										name='payments'
										className='form-control'
										value={values.payments}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger'
									data-bs-dismiss='modal'>
									Close
								</button>
								<button type='submit' className='addupibut'>
									{isLoading ? "ADDING UPI" : "ADD UPI"}
								</button>
							</div>
						</form>
						{Object.keys(errors).length > 0 && (
							<div className='ui error message'>
								<div className='list'>
									{Object.values(errors).map((value) => (
										<li key={value}>{value}</li>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div
				className='modal fade'
				id='exampleModalForAddress'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								ADD ADDRESS AND PHONE NUMBER
							</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'></button>
						</div>
						<form onSubmit={(e) => addAddress(e)}>
							<div className='modal-body '>
								<div className='input-group mb-3 address-modal'>
									<label>ADDRESS: </label>
									<input
										type='text'
										name='address'
										className='form-control address-input-modal'
										value={values.address}
										onChange={onChange}
									/>
									<label>PHONE: </label>
									<input
										type='text'
										name='phone'
										className='form-control address-input-modal'
										value={values.phone}
										onChange={onChange}
									/>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger'
									data-bs-dismiss='modal'>
									Close
								</button>
								<button type='submit' className='addupibut'>
									{isLoadingAddress ? "ADDING ADDRESS" : "ADD ADDRESS"}
								</button>
							</div>
						</form>
						{Object.keys(errors).length > 0 && (
							<div className='ui error message'>
								<div className='list'>
									{Object.values(errors).map((value) => (
										<li key={value}>{value}</li>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
