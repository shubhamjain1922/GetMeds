import React from "react";
import Dashboard from "../assets/templatewhite.svg";
import Profile from "../assets/user-circlewhite.svg";
import SignUpImg from "../assets/duplicatewhite.svg";
import SignInImg from "../assets/calendarwhite.svg";
import { Link } from "react-router-dom";
import "../css/RegisterNavbar.css";

export default function LoginNavbar() {
	return (
		<div className='registerNav-container'>
			<div className='registerNav-subcont'>
				<div className='registerNav-title'>
					<span className='registerNav-title-logo'>GetMeds</span>
				</div>
				<div className='registerNav-centercont'>
					<Link to='/' className='redirect-links-register'>
						<div className='registerNav-contentlist'>
							<img src={Dashboard} alt='dashboard' />
							<span>Dashboard</span>
						</div>
					</Link>
					<Link to='/profile' className='redirect-links-register'>
						<div className='registerNav-contentlist'>
							<img src={Profile} alt='dashboard' />
							<span>Profile</span>
						</div>
					</Link>
					<Link to='/register' className='redirect-links-register'>
						<div className='registerNav-contentlist'>
							<img src={SignUpImg} alt='dashboard' />
							<span>Sign Up</span>
						</div>
					</Link>
					<Link to='/login' className='redirect-links-register'>
						<div className='registerNav-contentlist'>
							<img src={SignInImg} alt='dashboard' />
							<span>Sign In</span>
						</div>
					</Link>
				</div>
				<div className='registerNav-freedownload'>
					<div className='registerNav-freedownload-btn'>Free Download</div>
				</div>
			</div>
		</div>
	);
}
