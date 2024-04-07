import React from "react";

import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import AdminLogin from "../../components/AdminLogin/AdminLogin";

import { useNavigate } from "react-router";

export default function BaseFormPage({ type }) {
	const navigate = useNavigate();

	!type ? navigate("/") : null;

	const handleSubmit = (data) => {
		if (type === "addAppointment") {
			console.log(data);
		} else if (type === "login") {
			console.log(data);
		}
	};

	const goBack = () => {
		console.log("goBack");
	};

	return (
		<>
			{type === "addAppointment" ? (
				<AppointmentForm
					handleSubmit={(data) => handleSubmit(data)}
					goBack={goBack}
				/>
			) : type === "login" ? (
				<AdminLogin
					handleSubmit={(data) => handleSubmit(data)}
					goBack={goBack}
				/>
			) : (
				<></>
			)}
		</>
	);
}
