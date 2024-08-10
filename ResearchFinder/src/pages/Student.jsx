import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@aws-amplify/ui-react";


const Student = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Student Page</h1>
      <Button onClick={() => navigate("/studentprofile")}>Student Profile</Button>
      <Button onClick={signOutHandler}>Sign Out</Button>
    </div>
  );
};

export default Student;
