import { configureStore } from "@reduxjs/toolkit";

// Importing Reducers
import appointmentsReducer from "../features/appointments/appointmentsSlice";

export const store = configureStore({
	reducer: {
		appointments: appointmentsReducer,
	},
});
