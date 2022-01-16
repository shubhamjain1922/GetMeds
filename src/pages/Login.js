import React, { useState, useContext } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Loginbackground from "../assets/logincover.svg";
import LoginNavbar from "../components/LoginNavbar";
import Loginfooter from "../assets/loginfooter.svg";
import "../css/Login.css";
import axios from "axios";
import { useForm } from "../utils/hooks.js";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	"& .MuiSwitch-track": {
		borderRadius: 22 / 2,
		"&:before, &:after": {
			content: '""',
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			width: 16,
			height: 16,
		},
		"&:before": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		"&:after": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "none",
		width: 16,
		height: 16,
		margin: 2,
	},
}));

export default function Login() {
	const [errors, setErrors] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const initialState = {
		username: "",
		password: "",
	};
	const context = useContext(AuthContext);
	const { user } = useContext(AuthContext);

	const { onChange, onSubmit, values } = useForm(loginUser, initialState);

	function formValidation(values) {
		if (values.username.trim() === "") {
			setErrors(["Email cannot be empty"]);
			return false;
		} else {
			const regEx =
				/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
			if (!values.username.match(regEx)) {
				setErrors(["Email must be a valid email address"]);
				return false;
			}
		}
		if (values.password.trim() === "") {
			setErrors(["Password cannot be empty"]);
			return false;
		}
		return true;
	}

	async function loginUser() {
		if (formValidation(values) === true) {
			const formData = new FormData();
			formData.append("username", values.username);
			formData.append("password", values.password);
			const headers = {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
			};
			setLoading(true);
			await axios
				.post("/login", formData, {
					headers,
				})
				.then((res) => {
					context.login(res.data);
					setLoading(false);
					navigate("/");
				})
				.catch((err) => {
					setLoading(false);
					setErrors(err.response.data);
				});
		}
	}
	return (
		<div className='login-main'>
			<LoginNavbar />
			<div className='login-container'>
				<div className='login-left'>
					<div className='login-wrapper'>
						<div className='login-header'>
							<span> Sign In</span>
						</div>
						<div className='login-subtext'>
							<span>Enter your email and password to sign in</span>
						</div>
						<form className='login-form' onSubmit={onSubmit}>
							<label>Email</label>
							<input
								type='text'
								className='input-field'
								name='username'
								placeholder='Email'
								value={values.username}
								onChange={onChange}
							/>
							<label>Password</label>
							<input
								type='password'
								className='input-field'
								name='password'
								placeholder='Password'
								value={values.password}
								onChange={onChange}
							/>
							<div className='remember-me'>
								<FormControlLabel
									control={<Android12Switch defaultChecked />}
									label='Remember Me'
								/>
							</div>
							<button type='submit' className='login-button'>
								{isLoading ? "SIGNING IN" : "SIGN IN"}
							</button>
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
						<div className='login-gotosignup'>
							<span>
								Don't have an account?
								<span className='bluetext'>
									<Link className='redirect-links' to='/register'>
										Sign up
									</Link>
								</span>{" "}
							</span>
						</div>
					</div>
				</div>
				<div className='login-right'>
					<img src={Loginbackground} className='login-back' alt='login-bb' />
				</div>
			</div>
			<div className='login-footer'>
				<img
					src={Loginfooter}
					alt='login-footer'
					className='login-footer-img'
				/>
			</div>
		</div>
	);
}
