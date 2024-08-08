import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";

const Faculty = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error in  signing out: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Faculty Page</h1>
      <Button onClick={signOutHandler}>Sign Out</Button>
    </div>
  );
};

export default Faculty;
