import React, { useState } from 'react';
import '../styling/forgotpassword.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ForgetPasswordPage() {
	const [userName, setUserame] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const navigate = useNavigate();

	const resetData = { password };

	function handleResetPassword(e) {
		e.preventDefault();
		fetch(`/reset-password/${userName}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(resetData)
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => console.log(data));
				navigate('/');
			} else {
				response.json().then((errorData) => setErrors(errorData.error));
			}
		});
	}

	return (
		<div id="forgot-password-page">
			<form id="reset-password-form" onSubmit={handleResetPassword}>
				<h2>Reset your password</h2>

				{errors.length > 0 && (
					<ul style={{ color: 'red' }}>
						<li>{errors}</li>
					</ul>
				)}

				<div className="row mb-3">
					<label className="form-label">Username</label>
					<br />
					<input
						className="form-control"
						type="text"
						placeholder="Enter username"
						required
						onChange={(e) => setUserame(e.target.value)}
					/>
				</div>

				<div className="row mb-3">
					<label className="form-label">Password</label>
					<br />
					<input
						className="form-control"
						type="password"
						placeholder="Enter Password"
						required
						autoComplete="true"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<p className="form-text">
					<Link to="/">Back to Login</Link>.
				</p>

				<div style={{ textAlign: 'center' }}>
					<button className="btn btn-primary" type="submit">
						Reset password
					</button>
				</div>
			</form>
		</div>
	);
}
