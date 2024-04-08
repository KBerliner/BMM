import React, { useEffect } from "react";

import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";

import { login } from "../../features/admins/adminsSlice";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Login from "../../components/AdminLogin/Login";

export default function BaseFormPage({ type }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const adminError = useSelector((state) => state.admins.hasError);
	const errorMessage = useSelector((state) => state.admins.response);

	!type ? navigate("/") : null;

	const handleSubmit = (data) => {
		if (type === "addAppointment") {
			console.log(data);
		} else if (type === "login") {
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
				<Login
					handleSubmit={(data) => handleSubmit(data)}
					goBack={goBack}
					error={adminError}
					errorMessage={errorMessage}
				/>
			) : (
				<></>
			)}
		</div>
	);
}
