import React from "react";
import { useState } from "react";
import { isEmail } from "validator";

export default function AdminLogin({ handleSubmit, goBack }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isValid, setIsValid] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();

		handleSubmit({
			admin_username: username,
			admin_password: password,
		});
	};

	const handleInput = ({ target }) => {
		const { name, value } = target;

		switch (name) {
			case "username":
				setUsername(value);
				value && password ? setIsValid(true) : setIsValid(false);
				break;
			case "password":
				setPassword(value);
				value && username ? setIsValid(true) : setIsValid(false);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<h1 className="text-center font-bold leading-9 text-2xl text-gray-900 mb-0 py-6 px-12">
				Sign into your account
			</h1>
			<div className="group min-h-full bg-blue-600 rounded-2xl shadow-md">
				<form
					id="admin_login_form"
					className="h-max duration-300 bg-white shadow-md px-6 py-12 rounded-b-xl rounded-t-xl flex flex-col sm:mx-auto w-full z-10"
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
						className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					></input>
				</form>
				<button
					type="submit"
					onClick={handleClick}
					className={`block w-full text-white px-4 py-2 rounded-2xl font-bold text-2xl disabled:p-0 disabled:hidden hover:pt-4 z-[-1] transition-transform ${
						isValid ? "translate-y-0" : "-translate-y-20"
					}`}
					id="login_submit_button"
					disabled={isValid ? null : "disabled"}
				>
					Login
				</button>
			</div>
		</>
	);
}

// import React, { useState, useEffect } from "react";
// import { isEmail } from "validator";

// export default function AdminLogin({ handleSubmit, goBack }) {
// 	const [username, setUsername] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [isValid, setIsValid] = useState(false);
// 	const [showButton, setShowButton] = useState(false); // State to manage button visibility including animation

// 	useEffect(() => {
// 		const valid = isEmail(username) && password.length > 0;
// 		setIsValid(valid);
// 		// If form becomes valid, show the button
// 		if (valid) setShowButton(true);
// 	}, [username, password]);

// 	useEffect(() => {
// 		// If form is invalid and button is currently shown, wait for animation to finish before hiding
// 		if (!isValid && showButton) {
// 			const timeoutId = setTimeout(() => {
// 				setShowButton(false);
// 			}, 500); // Duration should match the CSS transition
// 			return () => clearTimeout(timeoutId);
// 		}
// 	}, [isValid, showButton]);

// 	const handleClick = (e) => {
// 		e.preventDefault();
// 		handleSubmit({
// 			admin_username: username,
// 			admin_password: password,
// 		});
// 	};

// 	const handleInput = (e) => {
// 		const { name, value } = e.target;
// 		if (name === "username") setUsername(value);
// 		if (name === "password") setPassword(value);
// 	};

// 	return (
// 		<>
// 			<h1 className="text-center font-bold leading-9 text-2xl text-gray-900 mb-0 py-6 px-12">
// 				Sign into your account
// 			</h1>
// 			<div className="group min-h-full bg-blue-600 rounded-2xl shadow-md relative overflow-hidden">
// 				<form
// 					id="admin_login_form"
// 					className="duration-300 bg-white shadow-md px-6 py-12 rounded-b-xl rounded-t-xl flex flex-col sm:mx-auto w-full z-10"
// 				>
// 					<label
// 						className="block text-sm font-medium leading-6 text-gray-900"
// 						htmlFor="username"
// 					>
// 						Username:
// 					</label>
// 					<input
// 						value={username}
// 						onChange={handleInput}
// 						type="text"
// 						name="username"
// 						className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 					></input>
// 					<label
// 						className="block text-sm font-medium leading-6 text-gray-900 mt-6"
// 						htmlFor="password"
// 					>
// 						Password:
// 					</label>
// 					<input
// 						value={password}
// 						onChange={handleInput}
// 						type="password"
// 						name="password"
// 						className="mt-2 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// 					></input>
// 				</form>
// 				{showButton && (
// 					<div
// 						className={`transform transition-all ease-out duration-500 absolute bottom-0 left-0 w-full px-6 pb-2 z-0 ${
// 							isValid ? "translate-y-0" : "-translate-y-full opacity-0"
// 						}`}
// 					>
// 						<button
// 							type="submit"
// 							onClick={handleClick}
// 							className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
// 							id="login_submit_button"
// 						>
// 							Login
// 						</button>
// 					</div>
// 				)}
// 			</div>
// 		</>
// 	);
// }
