import React from "react";

export default function AdminLogin() {
	return (
		<>
			<h1>Admin Login</h1>
			<form>
				<label for="username">Username:</label>
				<input type="text" name="username"></input>
				<label for="password">Password:</label>
				<input type="password" name="password"></input>
			</form>
		</>
	);
}
