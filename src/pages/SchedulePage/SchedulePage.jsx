import React, { useState } from "react";

import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import { addAppointment } from "../../features/appointments/appointmentsSlice";

import { useSelector, useDispatch } from "react-redux";

export default function SchedulePage() {
	const dispatch = useDispatch();
	const error = useSelector((state) => state.appointments.hasError);

	const [showForm, setShowForm] = useState(true);

	const handleSubmit = (data) => {
		dispatch(addAppointment(data));
	};

	const goBack = () => {
		console.log("goBack");
	};

	return (
		<div className="grid place-items-center min-h-screen">
			{showForm ? (
				<AppointmentForm
					handleSubmit={(data) => handleSubmit(data)}
					goBack={goBack}
					error={error}
				/>
			) : (
				<></>
			)}
		</div>
	);
}
