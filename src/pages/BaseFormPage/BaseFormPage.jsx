import React from "react";

import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import AdminLogin from "../../components/AdminLogin/AdminLogin";

import { login } from "../../features/admins/adminsSlice";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import Login from "../../components/AdminLogin/Login";

export default function BaseFormPage({ type }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	!type ? navigate("/") : null;

	const handleSubmit = (data) => {
		if (type === "addAppointment") {
			console.log(data);
		} else if (type === "login") {
			console.log(data);
			dispatch(login(data));
		}
	};

	const goBack = () => {
		console.log("goBack");
	};

	return (
		<div className="h-screen w-screen bg-zinc-200 grid place-content-center">
			{type === "addAppointment" ? (
				<AppointmentForm
					handleSubmit={(data) => handleSubmit(data)}
					goBack={goBack}
				/>
			) : type === "login" ? (
				<Login handleSubmit={(data) => handleSubmit(data)} goBack={goBack} />
			) : (
				<></>
			)}
		</div>
	);
}
