// Importing Dependencies

import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Creating Async Thunks

// Fetch Appointment Thunk

export const fetchAppointments = createAsyncThunk(
	"appointments/fetchAppointments",
	async () => {
		const response = await fetch("http://localhost:3000/api/appointments");
		const data = await response.json();
		return data;
	}
);

// Fetch Unavailable Appointment Times Thunk

export const fetchUnavailable = createAsyncThunk(
	"appointments/fetchUnavailable",
	async (date) => {
		const response = await fetch(
			`http://localhost:3000/api/appointments/appointmenttimes/${date}`
		);
		const data = await response.json();
		return data;
	}
);

// Add Appointment Thunk

export const addAppointment = createAsyncThunk(
	"appointments/addAppointment",
	async (appointment) => {
		console.log(appointment);
		const response = await fetch("http://localhost:3000/api/appointments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(appointment),
		});
		const data = await response.json();
		return data;
	}
);

// Initializing the state

const initialState = {
	appointments: [],
	times: [],
	isLoading: false,
	hasError: false,
};

// Creating the Appointments Slice

const appointmentsSlice = createSlice({
	name: "appointments",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchAppointments.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.appointments = action.payload;
			})
			.addCase(fetchAppointments.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
				state.appointments = action.payload;
			})
			.addCase(fetchAppointments.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(addAppointment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
			})
			.addCase(addAppointment.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
			})
			.addCase(addAppointment.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			})
			.addCase(fetchUnavailable.fulfilled, (state, action) => {
				state.isLoading = false;
				state.hasError = false;
				state.times = action.payload;
			})
			.addCase(fetchUnavailable.rejected, (state, action) => {
				state.isLoading = false;
				state.hasError = true;
			})
			.addCase(fetchUnavailable.pending, (state, action) => {
				state.isLoading = true;
				state.hasError = false;
			});
	},
});

// Exporting

export const { getAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;
