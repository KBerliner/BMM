import React, { useEffect, useState } from "react";
import validator from "validator";

import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function Login({ handleSubmit, goBack, error, errorMessage }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [alert, setAlert] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();

		if (
			// Checking if the form is invalid
			(username !== validator.blacklist(username, "<>/") || !username) &&
			(password !== validator.blacklist(password, "<>/") || !password)
		) {
			setAlert(true);
		} else {
			handleSubmit({
				admin_username: username,
				admin_password: password,
			});
			setAlert(true);
		}
	};

	useEffect(() => {}, [errorMessage]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(validator.blacklist(value, "<>/"));
			value && password ? setIsValid(true) : setIsValid(false);
		}
		if (name === "password") {
			setPassword(validator.blacklist(value, "<>/"));
			value && username ? setIsValid(true) : setIsValid(false);
		}
	};

	return (
		<>
			<h1 className="text-center font-bold leading-9 text-2xl text-gray-900 mb-0 py-6 px-12">
				Sign into your account
			</h1>
			<div>
				<form
					onSubmit={handleClick}
					className="bg-white z-10 shadow-md px-8 py-12 rounded-xl relative"
				>
					<label
						className="block text-sm font-medium leading-6 text-gray-900"
						htmlFor="username"
					>
						Username:
					</label>
					<input
						value={username}
						onChange={handleInput}
						type="text"
						name="username"
						className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					></input>
					<label
						className="block text-sm font-medium leading-6 text-gray-900 mt-6"
						htmlFor="password"
					>
						Password:
					</label>
					<input
						value={password}
						onChange={handleInput}
						type="password"
						name="password"
						className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
						placeholder="Password"
					></input>
				</form>
			</div>
			<div
				className={`bg-blue-500 z-0 relative w-full pt-12 pb-4 text-center text-white font-bold rounded-b-xl align-text-bottom ${
					isValid ? "-top-8" : "-top-24"
				} duration-300 ease-in-out cursor-pointer hover:-top-6 hover:bg-blue-600 active:-top-24 focus:-top-24`}
				onClick={handleClick}
			>
				<button className="w-full h-full">Login</button>
			</div>
			{errorMessage ? (
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
						{errorMessage}
					</Alert>
				</Snackbar>
			) : (
				<></>
			)}
		</>
	);
}
