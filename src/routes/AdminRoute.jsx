import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, db_user, loading, isLoading } = useAuth();
  const location = useLocation();

  if (loading || isLoading) return "Loading...";
  if (user && db_user?.role === "Admin") return children;

  return <Navigate to="/" state={location.pathname} replace={true} />;
};

export default AdminRoute;
