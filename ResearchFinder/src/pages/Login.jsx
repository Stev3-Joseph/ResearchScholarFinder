import React, { useEffect } from "react";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config"; // Ensure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const { user } = useAuthenticator((context) => [context.user]);

  const postStu = async (email) => {
    try {
      await axios.post(`${API_URL}/registerStu`, { email });
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  const postFaculty = async (email) => {
    try {
      await axios.post(`${API_URL}/registerFac`, { email });
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
