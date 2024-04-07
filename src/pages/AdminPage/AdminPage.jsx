import React from "react";

import { useDispatch } from "react-redux";
import { addAppointment } from "../../features/appointments/appointmentsSlice";

import { checkSessionUtil } from "../../utils/checkSession";

export default function AdminPage() {
	// Checking for Token
	checkSessionUtil();

	const dispatch = useDispatch();

	const handleClick = () => {};

	return (
		<>
			<h1 onClick={handleClick}>Admin Page</h1>
		</>
	);
}
