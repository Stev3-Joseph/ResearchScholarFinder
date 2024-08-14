import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthenticator((context) => [context.user]);
  const { signOut } = useAuthenticator();

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error in signing out: ", error);
    }
  };

  const handleRoleSelection = (role) => {
    // Check if the user is not authenticated
    if (!user) {
      navigate(`/login/${role}`);
    } else {
      // Optional: You could handle what happens if the user is already logged in
      toast.error("User is already logged in. Please sign out first.");

      console.log("User is already logged in.");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Platform</h1>
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Select Your Role</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleRoleSelection("faculty")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Faculty
            </button>
            <button
              onClick={() => handleRoleSelection("student")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Student
            </button>
            {user && (
              <button
                onClick={signOutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
