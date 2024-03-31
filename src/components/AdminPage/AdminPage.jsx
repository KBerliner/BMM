import React from "react";

import { useDispatch } from "react-redux";
import { addAppointment } from "../../features/appointments/appointmentsSlice";

export default function AdminPage() {
	const dispatch = useDispatch();

	const handleClick = () => {
		// console.log("clicked");
		dispatch(
			addAppointment({
				customer_name: "Anna Olson",
				customer_email: "kristensmith@black-parker.com",
				customer_phone: "087-491-5146",
				appointment_date: "2024-03-24 15:58:25",
				appointment_time: "16:41",
				appointment_location: "3995 John Freeway\nRyanmouth, MI 29215",
				appointment_description:
					"Detail our staff Republican create with region kid thing opportunity.",
			})
		);
	};

	return (
		<>
			<h1 onClick={handleClick}>Admin Page</h1>
		</>
	);
}
