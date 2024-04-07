import React from "react";
import Logo from "../../../public/black_magic_motors_outline.svg";

export default function LandingPage() {
	return (
		<div className="grid place-items-center min-h-screen">
			<h1 className="text-4xl font-bold text-gray-900 font-logo">Hero</h1>
			<img src={Logo} alt="logo" className=" h-48 mx-auto bg-slate-400" />
		</div>
	);
}
