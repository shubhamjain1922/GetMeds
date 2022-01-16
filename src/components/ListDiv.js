import React from "react";
import Cart from "../assets/cart.svg";
import Phone from "../assets/phone.svg";
import Address from "../assets/address.svg";
import Coin from "../assets/coin2.svg";
import "../css/ListDiv.css";
import axios from "axios";

export default function ListDiv({ ...props }) {
	const token = localStorage.getItem("access_token");
	const headers = {
		Authorization: token ? `Bearer ${token}` : "",
	};

	const markAstaken = async (orderId) => {
		await axios
			.put(`/orders/${orderId}/taken`, {}, { headers })
			.then((res) => props.setComponentUpdated(!props.componentUpdated));
	};

	const markAsCompleted = async (orderId) => {
		await axios
			.put(`/orders/${orderId}/complete`, {}, { headers })
			.then((res) => props.setComponentUpdated(!props.componentUpdated));
	};

	return (
		<div className='listcon'>
			<p className='jobshead'>Orders Accepted</p>

			<div className='accordion accordion-flush' id='accaccordion'>
				{props.data && Object.keys(props.data).length > 0 && (
					<>
						{Object.values(props.data).map((value) => (
							<div className='accordion-item' key={value.id}>
								<h2 className='accordion-header'>
									<button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target={`#acc${value.id}`}
										aria-expanded='false'>
										<img src={Cart} alt='' className='jobsicon' />
										<div className='jobsinfodiv'>
											<p className='jobsname'>{value.name}</p>
											<p className='jobsaccinfo'>Staus: {value.status}</p>
										</div>
										{value.status === "accepted" ? (
											<button
												type='button'
												className='upibut takenbut'
												onClick={() => markAstaken(value.id)}>
												Taken
											</button>
										) : (
											<></>
										)}
										{value.status === "taken" ? (
											<button
												type='button'
												className='upibut compbut'
												onClick={() => markAsCompleted(value.id)}>
												Completed
											</button>
										) : (
											<></>
										)}
										{value.status === "completed" ? <></> : <> </>}
									</button>
								</h2>
								<div
									id={`acc${value.id}`}
									className='accordion-collapse collapse'
									data-bs-parent='#accaccordion'>
									<div className='accordion-body'>
										<p className='oracceptbyname'>UPI: {value.upayments}</p>
										<p className='oracceptbyno'>
											<img src={Phone} alt='' className='orphoneicon' />{" "}
											{value.uphone}
										</p>
										<p className='oracceptbyno'>
											<img src={Address} alt='' className='oraddressicon' />
											{value.uaddress}
										</p>
										<p className='oracceptbyno'>
											<img src={Coin} alt='' className='orcoinicon' />{" "}
											{value.reputation}
										</p>
										{value.symptoms.length === 0 ? (
											<></>
										) : (
											<div>
												<p className='listsechead'>SYMPTOMS</p>
												{value.symptoms.map((values) => (
													<div className='orderitemdiv'>
														<p className='medname'>{values}</p>
													</div>
												))}
											</div>
										)}
										{value.items.length === 0 ? (
											<></>
										) : (
											<div>
												<p className='listsechead'>ITEMS</p>
												{value.items.map((values) => (
													<div className='orderitemdiv'>
														<p className='medname'>{values.item}</p>
														<p className='medquantity'>x{values.qty}</p>
													</div>
												))}
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</>
				)}
			</div>
		</div>
	);
}
