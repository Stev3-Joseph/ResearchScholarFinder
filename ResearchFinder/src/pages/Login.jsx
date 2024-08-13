import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { user } = useAuthenticator((context) => [context.user]);

  const postStu = async (email) => {
    try {
      await axios.post("http://localhost:3001/registerStu", { email });
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  const postFaculty = async (email) => {
    try {
      await axios.post("http://localhost:3001/registerFac", { email });
    } catch (error) {
      console.error("Error registering faculty: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      const email = user.signInDetails.loginId;
      console.log("User signed in: ", email);
      navigate(role === "faculty" ? "/faculty" : "/student");
      role === "student" ? postStu(email) : postFaculty(email);
    }
  }, [user, navigate]);

  return (
    <Authenticator signUpAttributes={["email"]}>
      {({ user }) => {
        // This part is now handled in the useEffect hook
        return null;
      }}
    </Authenticator>
  );
};

export default Login;
