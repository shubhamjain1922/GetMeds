import React from "react";
import Dashboard from "../assets/template.svg";
import Profile from "../assets/user-circle.svg";
import SignUpImg from "../assets/duplicate.svg";
import SignInImg from "../assets/calendar.svg";
import "../css/LoginNavbar.css";
import { Link } from "react-router-dom";

export default function LoginNavbar() {
	return (
		<div className='loginNav-container'>
			<div className='loginNav-subcont'>
				<div className='loginNav-title'>
					<span className='loginNav-title-logo'>GetMeds</span>
				</div>
				<div className='loginNav-centercont'>
					<Link to='/' className='redirect-links'>
						<div className='loginNav-contentlist'>
							<img src={Dashboard} alt='dashboard' />
							<span>Dashboard</span>
						</div>
					</Link>
					<Link to='/profile' className='redirect-links'>
						<div className='loginNav-contentlist'>
							<img src={Profile} alt='dashboard' />
							<span>Profile</span>
						</div>
					</Link>
					<Link to='/register' className='redirect-links'>
						<div className='loginNav-contentlist'>
							<img src={SignUpImg} alt='dashboard' />
							<span>Sign Up</span>
						</div>
					</Link>
					<Link to='/login' className='redirect-links'>
						<div className='loginNav-contentlist'>
							<img src={SignInImg} alt='dashboard' />
							<span>Sign In</span>
						</div>
					</Link>
				</div>
				<div className='loginNav-freedownload'>
					<div className='loginNav-freedownload-btn'>Free Download</div>
				</div>
			</div>
		</div>
	);
}
