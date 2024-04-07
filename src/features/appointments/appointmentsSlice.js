// Importing Dependencies

import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

// Creating Async Thunks

// Fetch Appointment Thunk

export const fetchAppointments = createAsyncThunk(
	"appointments/fetchAppointments",
	async () => {
		const response = await fetch("http://localhost:3000/api/appointments");
		if (!response.ok) {
			throw new Error(response);
		}
		const data = await response.json();
		return data;
	}
);

// Add Appointment Thunk

export const addAppointment = createAsyncThunk(
	"appointments/addAppointment",
	async (appointment) => {
		const response = await fetch("http://localhost:3000/api/appointments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(appointment),
		});
		if (!response.ok) {
			throw new Error(response);
		}
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
			});
	},
});

// Exporting

export default appointmentsSlice.reducer;
