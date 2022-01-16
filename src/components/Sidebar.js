import React, { useContext } from "react";
import "../css/sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LoginIcon from "@mui/icons-material/Login";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function Sidebar() {
	const { user, logout } = useContext(AuthContext);
	return (
		<div className='Sidebar'>
			<ul className='Sidebarlist'>
				{/* {Sidebardata.map((val, key) => {
					return (
						<li key={key} className='row'>
							<div className='sidebar-icon'>{val.icon}</div>
							<div className='sidebar-title'>{val.title}</div>
						</li>
					);
				})} */}
				<Link to='/' className='sidebar-links row'>
					<li className='row'>
						<div className='sidebar-icon'>
							<div className='sidebar-icon-shadow'>
								<DashboardIcon />
							</div>
						</div>
						<div className='sidebar-title'>Dashboard</div>
					</li>
				</Link>
				<Link to='/profile' className='sidebar-links row'>
					<li className='row'>
						<div className='sidebar-icon'>
							{" "}
							<div className='sidebar-icon-shadow'>
								<CreditCardIcon />
							</div>
						</div>
						<div className='sidebar-title'>Billing</div>
					</li>
				</Link>
				<Link to='/profile' className='sidebar-links row'>
					<li className='row'>
						<div className='sidebar-icon'>
							<div className='sidebar-icon-shadow'>
								<AssignmentIndIcon />
							</div>
						</div>
						<div className='sidebar-title'>Profile</div>
					</li>
				</Link>
				{!user ? (
					<>
						<Link to='/login' className='sidebar-links row'>
							<li className='row'>
								<div className='sidebar-icon'>
									<div className='sidebar-icon-shadow'>
										<LoginIcon />
									</div>
								</div>
								<div className='sidebar-title'> Sign In</div>
							</li>
						</Link>
						<Link to='/register' className='sidebar-links row'>
							<li className='row'>
								<div className='sidebar-icon'>
									<div className='sidebar-icon-shadow'>
										<RocketLaunchIcon />
									</div>
								</div>
								<div className='sidebar-title'>Sign Up</div>
							</li>{" "}
						</Link>
					</>
				) : (
					<Link to='/login' className='sidebar-links row'>
						<li className='row' onClick={logout}>
							<div className='sidebar-icon'>
								<div className='sidebar-icon-shadow'>
									<LogoutIcon />
								</div>
							</div>
							<div className='sidebar-title'>Log Out</div>
						</li>
					</Link>
				)}
			</ul>
		</div>
	);
}

export default Sidebar;
