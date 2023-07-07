import React, { useEffect, useState } from 'react';
import '../styling/viewappointments.css';
import { Link } from 'react-router-dom';
import {useAuth} from './auth'

export default function ViewAppointment() {
	const [appointments, setAppointments] = useState([]);
	const [error, setErrors] = useState([]);
	const auth = useAuth()

	useEffect(() => {
		fetch('/patient_appointment', {
			method: 'GET',
			credentials: 'include'
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => setAppointments(data));
			} else {
				response.json().then((errorData) => setErrors(errorData.error));
			}
		});
	}, []);

	function handleDelete(e) {
		let id = e.target.value;
		fetch(`/appointments/${id}`, {
			method: 'DELETE',
			credentials: 'include'
		}).then((response) => {
			if (response.ok) {
				response.json().then((data) => console.log(data));
				window.location.reload(true);
			}
		});
	}

	const allAppointments = appointments.map((appointment) => {
		return (
			<tr key={appointment.id}>
				<td>{appointment.id}</td>
				<td>{appointment.doctor.id}</td>
				<td>{appointment.doctor.name}</td>
				<td>{appointment.doctor.speciality}</td>
				<td>{appointment.appointment_type}</td>
				<td>{appointment.date}</td>
				<td>{appointment.duration}</td>
				<td className="row">
					<div className="col-6">
						<Link
							className="btn btn-info"
							to={`/update-appointment/${appointment.id}`}
						>
							Update
						</Link>
					</div>

					<div className="col-6">
						<button
							className="btn btn-danger"
							value={appointment.id}
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				</td>
			</tr>
		);
	});

	return (
		<div id="all-appointments-page">
			<div id="welcome-message">
				<h1>Hi, {auth.user.slice(0, 1).toUpperCase() + auth.user.slice(1)}</h1>
				<h3>Here is a list of all your appointments.</h3>
			</div>

			<div id="add-button">
				<Link className="btn btn-success" to="/create-appointment">
					<span style={{ fontSize: '25px' }}>+</span> Create Appointment
				</Link>
			</div>

			{error.length > 0 && (
				<ul style={{ color: 'red' }}>
					<li>{error}</li>
				</ul>
			)}

			<table className="table" id="appointments-table">
				<thead className="thead">
					<tr className="text-light">
						<td>No.</td>
						<td>Doctor ID.</td>
						<td>Doctor Name</td>
						<td>Speciality</td>
						<td>Appointment type</td>
						<td>Date</td>
						<td>Duration</td>
						<td>Action</td>
					</tr>
				</thead>

				<tbody>{allAppointments}</tbody>
			</table>
		</div>
	);
}