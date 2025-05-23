import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export const Navbar = () => {
	const { isAuthenticated, user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Auth App</span>
				</Link>
				<div className="ml-auto">
					{isAuthenticated ? (
						<>
							<span className="me-3">Hello, {user?.email}</span>
							<button className="btn btn-outline-danger" onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-outline-primary me-2">Login</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary">Sign Up</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};