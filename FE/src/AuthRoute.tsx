import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectLoginState } from "slices/authSlice";

function AuthRoute({ component }: { component: JSX.Element }) {
  const login = useAppSelector(selectLoginState);
  const location = useLocation();

  if (!login) {
    return <Navigate to="/" state={{ from: location, alertOn: true }} replace />;
  }
  return component;
}

export default AuthRoute;
