import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styling/updateappointment.css';

export default function UpdateAppointment() {
	const params = useParams();
	const id = params.id;

	const [doctor, setDoctor] = useState('');
	const [date, setDate] = useState('');
	const [duration, setDuration] = useState('');
	const [appointment, setAppointment] = useState('');
	const [doctors, setDoctors] = useState([]);
	const [errors, setErrors] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetch('/doctors', {
			method: 'GET',
			credentials: 'include'
		})
			.then((response) => response.json())
			.then((data) => setDoctors(data));
	}, []);

	const allDoctors = doctors.map((doctor) => {
		return (
			<option key={doctor.id} value={doctor.id}>
				{doctor.name}
			</option>
		);
	});

	const appointmentData = {
		doctor_id: doctor,
		date,
		duration,
		appointment_type: appointment,
	};

	function handleUpdate(e) {
		e.preventDefault();
		fetch(`/appointments/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(appointmentData),
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => console.log(data));
				navigate('/appointments');
			} else {
				response.json().then((errorData) => setErrors(errorData.errors));
			}
		});
	}

	return (
		<div id="update-appointment-page">
			<form id="update-form" onSubmit={handleUpdate}>
				<h1>Update Appointment</h1>

				{errors.length > 0 && (
					<ul style={{ color: 'red' }}>
						{errors.map((error, index) => {
							return <li key={index}>{error}</li>;
						})}
					</ul>
				)}

				<div className="row mb-3">
					<label className="form-label">Select Doctor</label>
					<select
						className="form-select"
						onChange={(e) => setDoctor(e.target.value)}
					>
						<option>Choose Doctor ....</option>
						{allDoctors}
					</select>
				</div>

				<div className="row mb-3">
					<label className="form-label">Date</label>
					<input
						type="date"
						className="form-control"
						required
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<div className="row mb-3">
					<label className="form-label">Duration</label>
					<input
						type="text"
						placeholder="e.g 30 minutes"
						required
						onChange={(e) => setDuration(e.target.value)}
					/>
				</div>

				<div className="row mb-3">
					<label className="form-label">Type of Appointment</label>
					<input
						type="text"
						placeholder="e.g Consultation"
						required
						onChange={(e) => setAppointment(e.target.value)}
					/>
				</div>

				<div style={{ textAlign: 'center' }}>
					<button
						className="btn btn-primary"
						style={{ width: '150px' }}
						type="submit"
					>
						Update
					</button>
				</div>
			</form>
		</div>
	);
}
