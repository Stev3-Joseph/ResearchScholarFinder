import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@aws-amplify/ui-react";
import { useRole } from "../context/RoleContext";

const App = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const handleRoleSelection = (role) => {
    setRole(role);
    navigate(`/login/${role}`);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
