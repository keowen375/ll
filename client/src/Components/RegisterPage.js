import React, { useEffect, useState } from 'react';
import '../styling/register.css';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from './auth'

export default function SignUp() {

	const [user, setuser] = useState('');
	const [password, setPassword] = useState('');
	const [condition, setCondition] = useState('');
	const [nurse, setNurse] = useState('');
	const [nurses, setNurses] = useState([]);
	const [errors, setErrors] = useState([]);

	const auth = useAuth()

	const navigate = useNavigate();

	const signUpData = {
		name: user,
		password: password,
		condition: condition,
		nurse_id: nurse
	};

	useEffect(() => {
		fetch('https://quikhealth-l66y.onrender.com/nurses', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Accept': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => console.log(data));
	}, []);

	const allNurses = nurses.map((nurse) => {
		return (
			<option key={nurse.id} value={nurse.id}>
				{nurse.speciality}
			</option>
		);
	});

	function handleSignUp(e) {
		e.preventDefault();
		fetch('/patients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(signUpData),
		}).then((response) => {
			if (response.ok) {
				response.json().then((newPatient) => console.log(newPatient));
				auth.login(user)
				navigate('/appointments', {replace: true});
			} else {
				response.json().then((errorData) => setErrors(errorData.errors));
			}
		});
	}

	return (
		<div id="signup-page">
			<form id="signup-form" onSubmit={handleSignUp}>
				<h2 style={{ textAlign: 'center' }}>Sign Up</h2>

				{errors.length > 0 && (
					<ul style={{ color: 'red' }}>
						{errors.map((error, index) => {
							return <li key={index}>{error}</li>;
						})}
					</ul>
				)}

				<div className="row mb-3">
					<label className="form-label">user</label>
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
						autoComplete="true"
						placeholder=" password"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="row mb-3">
					<div className="col-6">
						<label className="form-label">Medical condition</label>
						<input
							className="form-control"
							type="text"
							placeholder="Enter condition"
							required
							onChange={(e) => setCondition(e.target.value)}
						/>
					</div>

					<div className="col-6">
						<label className="form-label">Nurse</label>
						<select
							className="form-select"
							onChange={(e) => setNurse(e.target.value)}
						>
							<option>Choose...</option>
							{allNurses}
						</select>
					</div>
				</div>

				<p className="form-text">
					Already have an account ?<Link to="/">Back to Log in</Link>
				</p>

				<div style={{ textAlign: 'center' }}>
					<button
						className="btn btn-primary"
						type="submit"
						style={{ width: '300px' }}
					>
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
}
