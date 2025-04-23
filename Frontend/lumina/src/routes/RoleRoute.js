import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ userRole, children }) => {
  const { auth } = useAuth();
  return auth.userRole === userRole ? children : <Navigate to="/" />;

};
  
export default RoleRoute;