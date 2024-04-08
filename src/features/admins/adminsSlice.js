// Importing Dependencies

import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Creating Async Thunks

// Checking the Session for Token

export const checkSession = createAsyncThunk(
	"appointments/checkSession",
	async () => {
		const response = await fetch(
			"http://localhost:3000/api/admin/checkSession"
		);
		if (!response.ok) {
			throw new Error(response);
		}
		console.log("ADMIN CHECK SESSION RESPONSE", response, response.status);
		return response.status;
	}
);

// Admin Login Thunk

export const login = createAsyncThunk("appointments/login", async (data) => {
	const response = await fetch("http://localhost:3000/api/admin/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	if (!response.ok) {
		throw new Error(response);
	}
	console.log("ADMIN LOGIN RESPONSE", response, response.status);
	return response.status;
});

// Creating the Admin Slice

const adminsSlice = createSlice({
	name: "admins",
	initialState: {
		isAdmin: false,
		isLoading: false,
		hasError: false,
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkSession.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
			})
			.addCase(checkSession.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
			})
			.addCase(checkSession.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
			})
			.addCase(login.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			});
	},
});

// Exporting Reducer

export default adminsSlice.reducer;
