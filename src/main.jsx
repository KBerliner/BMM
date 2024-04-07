import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./pages/LandingPage/LandingPage";
import SchedulePage from "./pages/SchedulePage/SchedulePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseFormPage from "./pages/BaseFormPage/BaseFormPage";

const router = createBrowserRouter([
	{ path: "/", element: <LandingPage /> },
	{ path: "/schedule", element: <SchedulePage /> },
	{ path: "/admin", element: <AdminPage /> },
	{ path: "/login", element: <BaseFormPage type="login" /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
