import { configureStore } from "@reduxjs/toolkit";

// Importing Reducers
import appointmentsReducer from "../features/appointments/appointmentsSlice";
import adminsReducer from "../features/admins/adminsSlice";

export const store = configureStore({
	reducer: {
		appointments: appointmentsReducer,
		admins: adminsReducer,
	},
});
