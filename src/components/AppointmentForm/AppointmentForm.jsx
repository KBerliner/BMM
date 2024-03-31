import React from "react";
import { useState, useEffect } from "react";

import moment from "moment";
import validator from "validator";

import { useDispatch } from "react-redux";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { StaticDateTimePicker } from "@mui/x-date-pickers";

export default function AppointmentForm({ handleSubmit }) {
	// Set necessary variables
	const dispatch = useDispatch();

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const textRegex = /^[a-zA-Z0-9\s,.!?@()-]*$/;
	const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
	const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

	const [nameStyle, setNameStyle] = useState("");
	const [emailStyle, setEmailStyle] = useState("");
	const [phoneStyle, setPhoneStyle] = useState("");
	const [dateStyle, setDateStyle] = useState("");
	const [timeStyle, setTimeStyle] = useState("");
	const [locationStyle, setLocationStyle] = useState("");
	const [descriptionStyle, setDescriptionStyle] = useState("");

	// Use state to store form data
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState(moment().format("YYYY-MM-DD:HH:mm"));
	// const [time, setTime] = useState(moment().format("HH:mm"));
	const [location, setLocation] = useState("Black Magic Motors");
	const [description, setDescription] = useState("");

	// Add sanitization on input
	const handleEmailInput = (value) => {
		if (validator.isEmail(value)) {
			console.log(value);
		}
		setEmail(value);
	};

	const handlePhoneInput = (value) => {
		if (validator.matches(value, phoneRegex)) {
			console.log(value);
		}
		setPhone(value);
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
	const handleFormSubmit = () => {
		const appointment = {
			location,
			date,
		};

		if (name === validator.blacklist(name, "<>/")) {
			appointment[name] = name;
		}
	};

	// Return the appointment form
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<form className="space-y-12 space-x-12">
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
						<div className="sm:col-span-2">
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
									className={`${nameStyle} block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
								/>
							</div>
						</div>

						{/* Email */}
						<div className="sm:col-span-3">
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
										handleEmailInput(validator.blacklist(e.target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${emailStyle}`}
								/>
							</div>
						</div>

						{/* Phone */}
						<div className="col-span-1">
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
										handlePhoneInput(validator.blacklist(target.value, "<>/"))
									}
									className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${phoneStyle}`}
									placeholder="(xxx) xxx-xxxx"
								/>
							</div>
						</div>

						<StaticDateTimePicker
							value={moment(date, "YYYY-MM-DD:HH:mm")}
							onChange={(e) => setDate(moment(e).format("YYYY-MM-DD:HH:mm"))}
							disablePast
							className="block w-full col-span-6"
							orientation="landscape"
						/>

						<div className="col-span-6">
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
						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								type="button"
								className="text-sm font-semibold leading-6 text-gray-900"
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
		</LocalizationProvider>
	);
}
