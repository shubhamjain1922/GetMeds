import React, { useContext } from "react";
import Dashboard from "../assets/template.svg";
import Profile from "../assets/user-circle.svg";
import SignUpImg from "../assets/duplicate.svg";
import SignInImg from "../assets/calendar.svg";
import "../css/Homenavbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function HomeNavbar() {
	const { user, logout } = useContext(AuthContext);
	const user_details = JSON.parse(localStorage.getItem("user_details"));
	console.log(user_details);
	return (
		<>
			{user ? (
				<div className='homeNavUser-container'>
					<div className='homeNavUser-subcont'>
						<Link to='/' className='home-link'>
							<div className='homeNavUser-title'>
								<span className='homeNavUser-title-logo'>GETMEDS</span>
							</div>
						</Link>
						<div className='homeNavUser-centercont'>
							<Link to='/' className='redirect-links'>
								<div className='homeNavUser-contentlist'>
									<img
										src={Dashboard}
										alt='dashboard'
										className='navbar-icons'
									/>
									<span>Dashboard</span>
								</div>
							</Link>
							<Link to='/profile' className='redirect-links'>
								<div className='homeNavUser-contentlist'>
									<img
										src={Profile}
										alt='dashboard'
										className='navbar-icons profile-icon'
									/>
									<span>{user_details.name}</span>
								</div>
							</Link>
							<div className='btn'>
								<button className='logout-btn' onClick={logout}>
									LOG OUT
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='homeNav-container'>
					<div className='homeNav-subcont'>
						<div className='homeNav-title'>
							<span className='homeNav-title-logo'>GETMEDS</span>
						</div>
						<div className='homeNav-centercont'>
							<Link to='/' className='redirect-links'>
								<div className='homeNav-contentlist'>
									<img src={Dashboard} alt='dashboard' />
									<span>Dashboard</span>
								</div>
							</Link>
							<Link to='/profile' className='redirect-links'>
								<div className='homeNav-contentlist'>
									<img src={Profile} alt='dashboard' />
									<span>Profile</span>
								</div>
							</Link>

							<Link to='/register' className='redirect-links'>
								<div className='homeNav-contentlist'>
									<img src={SignUpImg} alt='dashboard' />
									<span>Sign Up</span>
								</div>
							</Link>
							<Link to='/login' className='redirect-links'>
								<div className='homeNav-contentlist'>
									<img src={SignInImg} alt='dashboard' />
									<span>Sign In</span>
								</div>
							</Link>
						</div>

						<div className='homeNav-freedownload'>
							<div className='homeNav-freedownload-btn'>Free Download</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
