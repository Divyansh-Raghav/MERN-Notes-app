import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user,loading, children }) => {
    if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;