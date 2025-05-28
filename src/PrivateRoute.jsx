import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Import the AuthProvider hook

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
