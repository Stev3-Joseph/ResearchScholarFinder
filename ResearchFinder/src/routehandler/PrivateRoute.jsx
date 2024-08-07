import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);
  if (user && user?.attributes?.["custom:role"] === "faculty") {
    navigate("/faculty");
  } else if (user && user?.attributes?.["custom:role"] === "student") {
    navigate("/student");
  } else {
    pass;
  }
};

export default PrivateRoute;
