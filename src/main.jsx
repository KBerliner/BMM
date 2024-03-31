import React from "react";
import ReactDOM from "react-dom/client";
import SchedulePage from "./components/SchedulePage/SchedulePage";
import AdminPage from "./components/AdminPage/AdminPage";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{ path: "/", element: <SchedulePage /> },
	{ path: "/admin", element: <AdminPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
