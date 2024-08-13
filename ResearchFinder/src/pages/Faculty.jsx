import React, { useState } from "react";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import AddVacancy from "../components/AddVacancy";
import ViewVacancy from "../components/ViewVacancy";

const Faculty = () => {
  const navigate = useNavigate();
  const { signOut, user } = useAuthenticator();
  const [activeComponent, setActiveComponent] = useState(null);

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error in signing out: ", error);
    }
  };

  const handleAddVacancyClick = () => {
    setActiveComponent("addVacancy");
  };

  const handleViewVacancyClick = () => {
    setActiveComponent("viewVacancy");
  };

  const handleViewProfileClick = () => {
    navigate("/facultyprofile"); // Navigate to the FacultyProfile page
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <Button
          onClick={handleAddVacancyClick}
          className="mb-2 w-full text-left"
        >
          Add Vacancy
        </Button>
        <Button onClick={handleViewVacancyClick} className="w-full text-left">
          View Vacancy
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Faculty Page</h1>
          <div className="flex items-center">
            <Button onClick={handleViewProfileClick} className="mr-4">
              View Profile
            </Button>
            <Button onClick={signOutHandler}>Sign Out</Button>
          </div>
        </div>

        {/* Render Selected Component */}
        {activeComponent === "addVacancy" && <AddVacancy />}
        {activeComponent === "viewVacancy" && <ViewVacancy />}
      </div>
    </div>
  );
};

export default Faculty;
