import React, { useEffect, useState } from "react";
import cover from "../assets/profilecover.svg";
import avatar from "../assets/profileavatar.svg";
import coin from "../assets/coin.svg";
import time from "../assets/time.svg";
import AccountDiv from "../components/AccountDiv";
import Jobs from "../components/Jobs";
import ListDiv from "../components/ListDiv";
import TransactionDiv from "../components/TransactionDiv";

import "../css/Profile.css";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Profile() {
	const user_details = JSON.parse(localStorage.getItem("user_details"));
	const [userData, setUserData] = useState([]);
	const token = localStorage.getItem("access_token");
	const [componentUpdated, setComponentUpdated] = useState(false);

	useEffect(() => {
		const headers = {
			Authorization: token ? `Bearer ${token}` : "",
		};
		async function getOrders() {
			await axios.get("/users/info/all", { headers }).then((res) => {
				setUserData(res.data);
			});
		}
		getOrders();
	}, [componentUpdated, token]);
	console.log(userData);
	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-lg-2 con'>
					<div className='sidebar'>
						<Sidebar />
					</div>
				</div>
				<div className='col-lg-10 con'>
					<div className='wrapper'>
						<img src={cover} alt='cover' className='coverimg' />
						<div className='profilewrap'>
							<img
								src={avatar}
								cover='avatar'
								className='avatarimg'
								alt='profile-img'
							/>
							<div className='profileinfodiv'>
								<p className='profileinfoname'>{user_details.name}</p>
								<div className='profileinfoAddress'>9810728398</div>
							</div>
							<div className='profileattrdiv'>
								<img
									src={time}
									cover='time'
									className='coinimg'
									alt='profile-img'
								/>
								<p className='coinvalue'>{userData && userData.time_saved}</p>
								<p className='coininfo'>Minute saved</p>
							</div>
							<div className='profileattrdiv'>
								<img
									src={coin}
									cover='coin'
									className='coinimg'
									alt='profile-img'
								/>
								<p className='coinvalue'>{userData && userData.reputation}</p>
								<p className='coininfo'>Coins earned</p>
							</div>
						</div>
						<div className='container-fluid'>
							<div className='row '>
								<div className='col-lg-7'>
									<div>
										<AccountDiv
											{...userData}
											setComponentUpdated={setComponentUpdated}
											componentUpdated={componentUpdated}
										/>
										<ListDiv
											data={userData.accepted_orders}
											setComponentUpdated={setComponentUpdated}
											componentUpdated={componentUpdated}
										/>
									</div>
								</div>
								<div className='col-lg-5'>
									<Jobs {...userData.created_orders} />
									<TransactionDiv {...userData.orders} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
