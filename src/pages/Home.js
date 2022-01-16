import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../assets/cart.svg";
import Phone from "../assets/phone.svg";

import "../css/Home.css";
import Topnav from "../components/TopNav";
import Sidebar from "../components/Sidebar";
import Loader from "../assets/loader.gif";

const Home = () => {
	const [data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(false);
	const [updateList, setUpdateList] = useState(false);

	useEffect(() => {
		async function getData() {
			setLoadingData(true);
			await axios
				.get("/orders")
				.then((res) => {
					setData(res.data);
					setLoadingData(false);
				})
				.catch((err) => setLoadingData(false));
		}
		getData();
	}, [updateList]);

	const token = localStorage.getItem("access_token");
	const handleOrderAccept = async (orderId) => {
		const headers = {
			Authorization: token ? `Bearer ${token}` : "",
		};
		await axios
			.put(`/orders/${orderId}/accept`, {}, { headers })
			.then((res) => {
				window.location.reload();
				setUpdateList(!updateList);
			});
	};

	// const authorTableHead = [
	// 	"Issuer",
	// 	"Issuer Address",
	// 	"Order Details",
	// 	"Associated Coins",
	// 	"Accept",
	// ];

	// const authorHead = (item, index) => <th key={index}>{item}</th>;

	// const authorBody = (item, index) => (
	// 	<tr key={index}>
	// 		<td className='order-name'>{item.name}</td>
	// 		<td className='order-uaddress'>{item.uaddress}</td>
	// 		<td>
	// 			{/* {item.phone} */}
	// 			<button
	// 				style={{
	// 					borderRadius: "6px",
	// 					border: "1px solid",
	// 					borderColor: "#cc2d42",
	// 					color: "#cc2d42",
	// 					padding: "8px 16px",
	// 					textTransform: "capitalize",
	// 				}}>
	// 				{item.status}
	// 			</button>
	// 		</td>
	// 		<td className='order-reputation'>{item.reputation}</td>
	// 		<td>
	// 			<button
	// 				onClick={() => handleOrderAccept(item.id)}
	// 				className='accept-button'>
	// 				Accept
	// 			</button>
	// 		</td>
	// 	</tr>
	// );

	return (
		<div>
			<div className='layout__content'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-md-3 sidecontrem'>
							<Sidebar />
						</div>
						<div className='col-md-9'>
							<div className='layout__content-main'>
								<h2 className='page-header'>ALL ACTIVE ORDERS</h2>
								<Topnav setUpdateList={setUpdateList} updateList={updateList} />
								<div className='row'>
									{isLoadingData ? (
										<div className='col-12'>
											<img src={Loader} alt='loading...' />
										</div>
									) : (
										<div className='col-12'>
											<div className='card'>
												<div className='card__body'>
													{/* {data.length > 0 && (
													<Table
														//limit='6'
														headData={authorTableHead}
														renderHead={(item, index) =>
															authorHead(item, index)
														}
														bodyData={data}
														renderBody={(item, index) =>
															authorBody(item, index)
														}
													/>
												)} */}
													{Object.keys(data).length > 0 && (
														<>
															{Object.values(data).map((value) => (
																<div
																	className='accordion-item accordian-item-hover'
																	key={value.id}>
																	<h2 className='accordion-header header-flex'>
																		<button
																			className='accordion-button collapsed'
																			type='button'
																			data-bs-toggle='collapse'
																			data-bs-target={`#cre${value.id}`}
																			aria-expanded='false'>
																			<img
																				src={Cart}
																				alt=''
																				className='jobsicon'
																			/>
																			<div className='jobsinfodiv'>
																				<p className='jobsname'>{value.name}</p>
																				<p className='jobsaccinfo'>
																					Staus: {value.status}
																				</p>
																			</div>
																		</button>
																		<button
																			onClick={() =>
																				handleOrderAccept(value.id)
																			}
																			className='accept-button'>
																			Accept
																		</button>
																	</h2>
																	<div
																		id={`cre${value.id}`}
																		className='accordion-collapse collapse no-border'
																		data-bs-parent='#creaccordion'>
																		<div className='accordion-body'>
																			{value.status === "accepted" ? (
																				<div>
																					<p className='acceptbyname'>
																						Accepted By: Ayush Pawar
																					</p>
																					<p className='acceptbyno'>
																						<img
																							src={Phone}
																							alt=''
																							className='phoneicon'
																						/>{" "}
																						9910793801
																					</p>
																				</div>
																			) : (
																				<></>
																			)}
																			{value.symptoms.length === 0 ? (
																				<></>
																			) : (
																				<div>
																					<p className='listsechead'>
																						SYMPTOMS
																					</p>
																					{value.symptoms.map((values) => (
																						<div className='orderitemdiv'>
																							<p className='medname'>
																								{values}
																							</p>
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
																							<p className='medname'>
																								{values.item}
																							</p>
																							<p className='medquantity'>
																								x{values.qty}
																							</p>
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
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
