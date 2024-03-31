import React from "react";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

export default function SchedulePage() {
	const handleSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className="grid place-items-center min-h-screen">
			<AppointmentForm handleSubmit={(data) => handleSubmit(data)} />
		</div>
	);
}
