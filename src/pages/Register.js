import React, { useState } from "react";
import RegisterNavbar from "../components/RegisterNavbar.js";
import Registerfooter from "../assets/loginfooter.svg";
import RegisterHome from "../assets/registerHome.svg";
import GoogleIcon from "../assets/google.svg";
import FacebookIcon from "../assets/facebook.svg";
import AppleIcon from "../assets/apple.svg";
import "../css/Register.css";
import axios from "axios";
import { useForm } from "../utils/hooks.js";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
	const [errors, setErrors] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const initialState = {
		username: "",
		email: "",
		password: "",
	};

	const { onChange, onSubmit, values } = useForm(registerUser, initialState);

	function formValidation(values) {
		if (values.username.trim() === "") {
			setErrors(["Username cannot be empty"]);
			return false;
		}
		if (values.email.trim() === "") {
			setErrors(["Email cannot be empty"]);
			return false;
		} else {
			const regEx =
				/^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
			if (!values.email.match(regEx)) {
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

	async function registerUser() {
		if (formValidation(values) === true) {
			const headers = {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			};
			setLoading(true);
			await axios
				.post(
					"/users",
					{
						name: values.username,
						id: values.email,
						password: values.password,
					},
					{
						headers,
					}
				)
				.then((res) => {
					setLoading(false);
					navigate("/login");
				})
				.catch((err) => {
					setLoading(false);
					setErrors(err.response.data);
				});
		}
	}

	return (
		<div className='register-main'>
			<RegisterNavbar />

			<div className='register-container'>
				<img src={RegisterHome} className='register-cover' alt='img-main' />
				<div className='register-form-wrapper'>
					<div className='register-title'>Sign Up</div>
					{/* <div className='register-subtext'>
						Please fill out the form to register yourself
					</div> */}
					<div className='register-form-cont'>
						<div className='register-with'>
							<span>Register With</span>
						</div>
						<div className='register-imgs'>
							<img src={AppleIcon} alt='apple icon' />
							<img src={FacebookIcon} alt='facebook' />
							<img src={GoogleIcon} alt='google' />
						</div>
						<div className='or'>
							<span>Or</span>
						</div>
						<form className='register-form' onSubmit={onSubmit}>
							<label className='register-label'>Username</label>
							<input
								type='text'
								className='input-field-register'
								name='username'
								placeholder='Username'
								value={values.username}
								onChange={onChange}
							/>
							<label className='register-label'>Email</label>
							<input
								type='text'
								className='input-field-register'
								name='email'
								placeholder='Email'
								value={values.email}
								onChange={onChange}
							/>
							<label className='register-label'>Password</label>
							<input
								type='password'
								className='input-field-register'
								name='password'
								placeholder='Password'
								value={values.password}
								onChange={onChange}
							/>
							<div className='register-btn-cont'>
								<button type='submit' className='register-button'>
									{isLoading ? "REGUSTERING YOU" : "REGISTER"}
								</button>
							</div>
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
						<div className='already-have'>
							Already have an account?{" "}
							<Link to='/login' className='redirect-links'>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className='register-footer'>
				<img
					src={Registerfooter}
					alt='img-main'
					className='register-footer-img'
				/>
			</div>
		</div>
	);
}
