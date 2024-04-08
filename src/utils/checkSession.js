// Importing Dependencies
import { useDispatch } from "react-redux";

import { checkSession } from "../features/admins/adminsSlice";
import { useNavigate } from "react-router";

export const checkSessionUtil = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	dispatch(checkSession())
		.then((response) => {
			if (!response.ok) {
				navigate("/login");
			}
		})
		.catch(() => {
			navigate("/login");
		});
};
