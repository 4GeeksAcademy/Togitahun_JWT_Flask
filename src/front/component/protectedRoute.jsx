import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};