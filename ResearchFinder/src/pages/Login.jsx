import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <Authenticator>
      {({ user }) => {
        if (user) {
          const userRole = user?.attributes?.["custom:role"];
          navigate(userRole === "faculty" ? "/faculty" : "/student");
        }
      }}
    </Authenticator>
  );
};

export default Login;
