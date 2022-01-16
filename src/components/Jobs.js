import React from "react";
import Cart from "../assets/cart.svg";
import Phone from "../assets/phone.svg";
import "../css/Jobs.css";

export default function Jobs({ ...props }) {
	return (
		<div className='addresscon'>
			<p className='jobshead'>Orders Created</p>
			<div className='accordion accordion-flush' id='creaccordion'>
				{Object.keys(props).length > 0 && (
					<>
						{Object.values(props).map((value) => (
							<div className='accordion-item' key={value.id}>
								<h2 className='accordion-header'>
									<button
										className='accordion-button collapsed'
										type='button'
										data-bs-toggle='collapse'
										data-bs-target={`#cre${value.id}`}
										aria-expanded='false'>
										<img src={Cart} alt='' className='jobsicon' />
										<div className='jobsinfodiv'>
											<p className='jobsname'>{value.name}</p>
											<p className='jobsaccinfo'>Staus: {value.status}</p>
										</div>
									</button>
								</h2>
								<div
									id={`cre${value.id}`}
									className='accordion-collapse collapse'
									data-bs-parent='#creaccordion'>
									<div className='accordion-body'>
										{
											value.status==="accepted"? <div><p className='acceptbyname'>Accepted By: Ayush Pawar</p>
											<p className='acceptbyno'>
												<img src={Phone} alt='' className='phoneicon' />{" "}
												9910793801
											</p></div> : <></>
										}
										{
											value.symptoms.length === 0 ? <></> : <div><p className='listsechead'>SYMPTOMS</p>
												{value.symptoms.map((values) => (
													<div className='orderitemdiv'>
														<p className='medname'>{values}</p>
													</div>
												))}
											</div>
										}
										{
											value.items.length === 0 ? <></> : <div><p className='listsechead'>ITEMS</p>
												{value.items.map((values) => (
													<div className='orderitemdiv'>
													<p className='medname'>{values.item}</p>
													<p className='medquantity'>x{values.qty}</p>
												</div>
												))}
											</div>
										}
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
