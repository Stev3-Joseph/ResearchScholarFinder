import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  if (authStatus !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
