import React, { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && role) {
      if (role === "student") {
        navigate("/student");
      } else if (role === "faculty") {
        navigate("/faculty");
      } else {
        console.error("Invalid role:", role);
        navigate("/");
      }
    }
  }, [user, role, navigate]);

  return user && role ? null : children;
};

export default ProtectedRoute;
