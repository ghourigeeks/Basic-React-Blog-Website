import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to the home page if the user is not authenticated.
    // State is used to redirect back after login.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If the user is authenticated, render the children (protected content).
  return children;
};

export default ProtectedRoute;
