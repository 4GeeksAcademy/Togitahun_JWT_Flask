import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Welcome to React Auth App</h1>
			<p className="lead">
				A simple application with authentication using React, Flask, and JWT
			</p>

			{store.isAuthenticated ? (
				<div className="mt-4">
					<p>You are logged in as {store.user?.email}</p>
					<Link to="/welcome" className="btn btn-primary">
						Go to Welcome Page
					</Link>
				</div>
			) : (
				<div className="mt-4">
					<p>Please log in or sign up to access the welcome page</p>
					<Link to="/login" className="btn btn-primary me-2">
						Login
					</Link>
					<Link to="/signup" className="btn btn-outline-primary">
						Sign Up
					</Link>
				</div>
			)}
		</div>
	);
};