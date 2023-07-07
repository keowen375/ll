import React, { useState } from 'react';
import '../styling/login.css';
import { useAuth } from './auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function SignInPage() {
	
	const [user, setuser] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const auth = useAuth()
	const location = useLocation()

	const redirectPath = location.state?.path || '/appointments'

	const navigate = useNavigate();

	const logInData = { name: user, password };

	function handleLogin(e) {
		e.preventDefault();
		fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(logInData)
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => console.log(data));
				auth.login(user)
				navigate(redirectPath, {replace: true});
			} else {
				response.json().then((errorData) => setErrors(errorData.error));
			}
		});
	}

	return (
		<div id="login-page">
			<form id="login-form" onSubmit={handleLogin}>
				<h2 style={{ textAlign: 'center' }}>Log In </h2>
				{errors.length > 0 && (
					<ul style={{ color: 'red' }}>
						<li>{errors}</li>
					</ul>
				)}
				<div className="row mb-3">
					<label className="form-label">user </label>
					<input
						className="form-control"
						type="text"
						placeholder="Enter user"
						required
						onChange={(e) => setuser(e.target.value)}
					/>
				</div>
				<div className="row mb-3">
					<label className="form-label">Password</label>
					<input
						className="form-control"
						type="password"
						placeholder="Enter password"
						autoComplete="true"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<p className="form-text">
					<Link to="/forget-password">Forgot Password?</Link>
				</p>
				<p className="form-text">
					Don't have an account?
					<Link to="/register"> Create an account.</Link>
				</p>
				<div style={{ textAlign: 'center' }}>
					<button
						className="btn btn-primary"
						type="submit"
						style={{ width: '230px' }}
					>
						Log In
					</button>
				</div>
			</form>
		</div>
	);
}
