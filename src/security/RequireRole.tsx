import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../zustand/authStore";

type Props = {
  roles: Array<"admin" | "manager" | "viewer">;
  children: React.ReactNode;
};

export const RequireRole: React.FC<Props> = ({ roles, children }) => {
  const { role } = useAuthStore();
  const location = useLocation();
  if (!role || !roles.includes(role)) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }
  return <>{children}</>;
};
