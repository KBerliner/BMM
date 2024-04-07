import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import moment from "moment";
import validator from "validator";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { checkSessionUtil } from "../../utils/checkSession";

export default function AppointmentForm({ handleSubmit, goBack, error }) {
	// Checking if the user is an admin
	checkSessionUtil();

	// Set necessary variables
	const navigate = useNavigate();

	const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

	const [alert, setAlert] = useState(false);

	// Use state to store form data
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState(moment().format("YYYY-MM-DD:HH:mm"));
	const [location, setLocation] = useState("Black Magic Motors");
	const [description, setDescription] = useState("");

	// Disabled time to keep schedules during working hours

	const disableTime = (value, view) => {
		const hour = value.hour();
		return hour < 9 || hour > 16;
	};
	// Handle Validation on input
	const validateForm = () => {
		// Check if the name contains blacklisted characters
		if (name !== validator.blacklist(name, "<>/") || !name) {
			return false;
		}

		// Check if the email is valid and does not contain blacklisted characters
		if (
			email !== validator.blacklist(email, "<>/") ||
			!validator.isEmail(email) ||
			!email
		) {
			return false;
		}

		// Check if the phone number is valid and does not contain blacklisted characters
		if (
			phone !== validator.blacklist(phone, "<>/") ||
			!validator.matches(phone, phoneRegex) ||
			!phone
		) {
			return false;
		}

		// Check if the date is valid and is after right now

		if (date <= moment().format("YYYY-MM-DD:HH:mm")) {
			return false;
		}

		// Check if the description contains blacklisted characters
		if (
			description !== validator.blacklist(description, "<>/") ||
			!description
		) {
			return false;
		}

		// If all checks pass
		return true;
	};

	// Handle form submission
	const handleFormSubmit = (e) => {
		e.preventDefault();

		const dbDate = date.split(":")[0];
		const dbTime = date.split(":")[1] + ":" + date.split(":")[2];

		const appointment = {
			appointment_location: location,
			appointment_date: dbDate,
			appointment_time: dbTime,
		};

		if (validateForm()) {
			appointment.customer_name = name;
			appointment.customer_email = email;
			appointment.customer_phone = phone;
			appointment.appointment_description = description;

			setAlert(true);

			handleSubmit(appointment);
			navigate("/");
		} else {
			setAlert(true);
		}
	};

	// Return the appointment form
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<form className="space-y-12 space-x-12 m-12" onSubmit={handleFormSubmit}>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Appointment Request Form
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Please input all this information as accurate as possible. <br />{" "}
						All Fields are Required.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						{/* First Name and Last Name combined into one "name" field for simplicity */}
						<div className="col-span-1 sm:col-span-2">
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Name (First and Last)
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="name"
									id="name"
									value={name}
									onInput={({ target }) =>
										setName(validator.blacklist(target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
								/>
							</div>
						</div>

						{/* Email */}
						<div className="col-span-1 sm:col-span-2">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									value={email}
									onInput={(e) =>
										setEmail(validator.blacklist(e.target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
								/>
							</div>
						</div>

						{/* Phone */}
						<div className="col-span-1 sm:col-span-2">
							<label
								htmlFor="phone"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Phone
							</label>
							<div className="mt-2">
								<input
									type="tel"
									name="phone"
									id="phone"
									value={phone}
									onInput={({ target }) =>
										setPhone(validator.blacklist(target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
									placeholder="(xxx) xxx-xxxx"
								/>
							</div>
						</div>

						{/* Date */}
						<div className="block w-full col-span-1 sm:col-span-2">
							<label
								htmlFor="date"
								className="block text-sm font-medium leading-6"
							>
								Date
							</label>
							<DateTimePicker
								value={moment(date, "YYYY-MM-DD:HH:mm")}
								onChange={(e) => setDate(moment(e).format("YYYY-MM-DD:HH:mm"))}
								disablePast
								className="block w-full col-span-3"
								orientation="landscape"
								name="date"
								minutesStep={30}
								shouldDisableTime={disableTime}
							/>
						</div>

						{/* Description */}
						<div className="col-span-1 sm:col-span-6">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Description
							</label>
							<div className="mt-2">
								<textarea
									type="text"
									name="description"
									id="description"
									value={description}
									onInput={({ target }) =>
										setDescription(validator.blacklist(target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 ring-1 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
									rows="4"
								/>
							</div>
						</div>

						{/* Submit and Cancel Buttons */}
						<div className="mt-6 flex items-center justify-start gap-x-6">
							<button
								type="button"
								className="text-sm font-semibold leading-6 text-gray-900 bg-slate-100 px-3 py-2 rounded-md hover:bg-gray-300 active:bg-gray-400"
								onClick={goBack}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="disabled:bg-zinc-400 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								disabled={!validateForm()}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</form>
			<Snackbar
				open={alert}
				autoHideDuration={6000}
				onClose={() => setAlert(false)}
			>
				<Alert
					onClose={() => setAlert(false)}
					severity={error ? "error" : "success"}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{error
						? "Appointment Request Failed"
						: "Appointment Request Succeeded"}
				</Alert>
			</Snackbar>
		</LocalizationProvider>
	);
}
