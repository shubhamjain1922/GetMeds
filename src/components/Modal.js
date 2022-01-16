import axios from "axios";
import React, { useState } from "react";
import "../css/Modal.css";

function Modal({ ...props }) {
	const [medicineName, setMedecinedName] = useState();
	const [symptomsName, setSymptomsName] = useState();
	const [medicineList, setMedicineList] = useState([]);
	const [symptomsList, setSymptomsList] = useState([]);
	const [medicineQty, setMedicineQty] = useState(1);
	const [errors, setErrors] = useState([]);
	const [listName, setListName] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const changeMedicine = (event) => {
		setMedecinedName(event.target.value);
	};

	const changeSymptoms = (event) => {
		setSymptomsName(event.target.value);
	};

	const addMedicine = () => {
		setMedicineList([
			...medicineList,
			{ item: medicineName, qty: medicineQty },
		]);
		setMedicineQty(1);
		setMedecinedName("");
	};

	const addSymptoms = () => {
		setSymptomsList([...symptomsList, symptomsName]);
		setSymptomsName("");
	};

	const formValidation = (listName) => {
		if (listName.trim() === "") {
			setErrors(["List Name must be provided"]);
			return false;
		}
		return true;
	};

	const token = localStorage.getItem("access_token");

	const makeOrder = () => {
		const headers = {
			Authorization: token ? `Bearer ${token}` : "",
		};
		setIsAdding(true);
		if (formValidation(listName)) {
			axios
				.post(
					"/orders/",
					{
						name: listName,
						items: medicineList,
						symptoms: symptomsList,
						reputation: 0,
					},
					{ headers }
				)
				.then((res) => {
					props.props.setUpdateList(!props.props.updateList);
					setIsAdding(false);
					setListName("");
					setMedicineList([]);
					setSymptomsList([]);
					setMedicineQty(1);
					setMedecinedName("");
					setSymptomsName("");
				})
				.catch((err) => {
					if (err.response.status === 403) {
						alert(
							"PLEASE COMPLETE PROFILE BY ADDING ADDRESS AND UPI ID BEFORE CREATING A LIST"
						);
					}
					setIsAdding(false);
					setListName("");
					setMedicineList([]);
					setSymptomsList([]);
					setMedicineQty(1);
					setMedecinedName("");
					setSymptomsName("");
				});
		}
	};

	return (
		<>
			<div
				className='modal fade'
				id='createModal'
				tabIndex='-1'
				aria-labelledby='exampleModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog'>
					<div className='modal-content modal-content-flex'>
						<div className='modal-left'>
							<div className='modal-header'>
								<h5 className='modal-title' id='exampleModalLabel'>
									CREATE YOUR LIST
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'></button>
							</div>
							<div className='modal-body'>
								<div className='list-name-container'>
									<label className='model-left-label'>List Name</label>
									<input
										className='list-name-input model-left-input-field'
										name='listname'
										onChange={(e) => setListName(e.target.value)}
										value={listName}
									/>
								</div>
								<div className='input-group mb-3 medicine-input'>
									<label className='model-left-label'>Medicine Name</label>
									<div className='medicine-input-container'>
										<input
											type='text'
											className='form-control medicine-input-field model-left-input-field'
											name='medicinename'
											value={medicineName}
											onChange={changeMedicine}
										/>
										<select
											value={medicineQty}
											onChange={(e) => setMedicineQty(e.target.value)}
											className='medquant'>
											<option value='1'>1</option>
											<option value='2'>2</option>
											<option value='3'>3</option>
											<option value='4'>4</option>
											<option value='5'>5</option>
											<option value='6'>6</option>
											<option value='7'>7</option>
											<option value='8'>8</option>
											<option value='9'>9</option>
											<option value='10'>10</option>
										</select>
									</div>
									<div className='button-contain'>
										<button onClick={addMedicine} className='model-left-button'>
											Add Medicine
										</button>
									</div>
								</div>
								<div className='input-group mb-3 symptoms-input'>
									<label className='model-left-label'>Symptoms</label>
									<div className='symptoms-input-container'>
										<input
											name='symptomname'
											type='text'
											value={symptomsName}
											className='form-control symptoms-input-field model-left-input-field'
											onChange={changeSymptoms}
										/>
									</div>
									<div className='button-contain'>
										<button onClick={addSymptoms} className='model-left-button'>
											Add Symptoms
										</button>
									</div>
								</div>
							</div>
							<div className='modal-footer'>
								<button
									type='button'
									className='btn btn-danger closebut'
									data-bs-dismiss='modal'>
									Close
								</button>
								<button
									type='button'
									className='addorderbut'
									onClick={makeOrder}>
									{isAdding ? "ADDING ORDER" : "ADD ORDER"}
								</button>
							</div>
						</div>
						<div className='modal-right'>
							<div className='modal-right-heading'>Current List Details</div>
							<div className='modal-right-order-details'>
								<div className='modal-right-list-name'>
									<span className='modal-right-label'>List Name: </span>
									<span className='modal-right-text'>{listName}</span>
								</div>
								<div className='modal-right-order-details'>
									{
										<div className='order-name'>
											<span className='modal-right-label'>
												Medicines Added:
											</span>
											{medicineList.map((value) => (
												<div className='modal-right-list-container'>
													<span className='modal-right-medicine-name'>
														{value.item}
													</span>
													&nbsp;
													<span className='modal-right-medicine-name'>
														x{value.qty}
													</span>
												</div>
											))}
										</div>
									}
								</div>
								<div className='modal-right-symptomps-details'>
									{
										<div className='symptom-name'>
											<span className='modal-right-label'>Symptoms Added:</span>
											{symptomsList.map((value) => (
												<div className='modal-right-list-container'>
													<span className='modal-right-medicine-name'>
														{value}
													</span>
												</div>
											))}
										</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Modal;
