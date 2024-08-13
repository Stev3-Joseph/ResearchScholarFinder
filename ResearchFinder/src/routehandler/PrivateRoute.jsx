import React, { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const ProtectedRoute = ({ children }) => {
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role != null) {
      if (role === "student") {
        navigate("/login/student");
      } else if (role === "faculty") {
        navigate("login/faculty");
      } else {
        console.error("Invalid role:", role);
        navigate("/");
      }
    }
  }, [user, role, navigate]);

  return role ? null : children;
};

export default ProtectedRoute;
