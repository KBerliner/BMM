import React from "react";
import { useState } from "react";

export default function AdminLogin({ handleSubmit, goBack }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleClick = (e) => {
		e.preventDefault();

		handleSubmit({
			admin_username: username,
			admin_password: password,
		});
	};

	return (
		<>
			<h1>Admin Login</h1>
			<form>
				<label htmlFor="username">Username:</label>
				<input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
					type="text"
					name="username"
				></input>
				<label htmlFor="password">Password:</label>
				<input
					value={password}
					onChange={({ target }) => setPassword(target.value)}
					type="password"
					name="password"
				></input>
				<button type="submit" onClick={handleClick}>
					Login
				</button>
			</form>
		</>
	);
}
