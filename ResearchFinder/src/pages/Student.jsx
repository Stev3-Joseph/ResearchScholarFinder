import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuthenticator,
  Button,
  Card,
  Heading,
  Flex,
  Text,
  Badge,
} from "@aws-amplify/ui-react";
import axios from "axios";

const Student = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthenticator();
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/showvacancystudent"
        );
        setVacancies(response.data);
      } catch (error) {
        console.error("Error fetching vacancies: ", error);
      }
    };
    fetchVacancies();
  }, []);

  const signOutHandler = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleViewProfileClick = () => {
    navigate("/studentprofile"); // Navigate to the StudentProfile page
  };

  const handleApplyClick = (email) => {
    // You can handle the apply logic here, such as navigating to an application form or sending an email
    window.location.href = `mailto:${email}?subject=Application for Research Vacancy`;
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <Button
          onClick={handleViewProfileClick}
          className="mb-2 w-full text-left"
        >
          View Profile
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Research Vacancies
          </h1>
          <div className="flex items-center">
            <Button onClick={handleViewProfileClick} className="mr-4">
              View Profile
            </Button>
            <Button variation="primary" onClick={signOutHandler}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Vacancies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacancies.map((vacancy, index) => (
            <Card
              key={index}
              borderRadius="medium"
              boxShadow="medium"
              backgroundColor="white"
              padding="medium"
              className="flex flex-col justify-between h-full"
            >
              <div>
                <Heading level={4} marginBottom="small">
                  {vacancy.ResearchTopic}
                </Heading>
                <Text as="span" fontSize="small" color="gray-600">
                  Faculty: {vacancy.FacultyName}
                </Text>
                <Flex direction="column" marginTop="small" gap="small">
                  <Text fontWeight="bold">
                    Skills Required: {vacancy.RequiredSkills}
                  </Text>
                  <Text>Details: {vacancy.Details}</Text>
                  <Text>Min CGPA: {vacancy.MinCGPA}</Text>
                  <Badge
                    variation={
                      vacancy.PaidResearch === "true" ? "success" : "warning"
                    }
                  >
                    {vacancy.PaidResearch === "true"
                      ? "Paid Research"
                      : "Unpaid Research"}
                  </Badge>
                </Flex>
              </div>
              <Button
                variation="primary"
                onClick={() => handleApplyClick(vacancy.Email)}
                marginTop="auto"
              >
                Apply
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Student;
