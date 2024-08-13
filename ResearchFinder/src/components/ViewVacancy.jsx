import React, { useEffect, useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import axios from "axios";

const ViewVacancy = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const email = user?.signInDetails?.loginId;

  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getvacancies", {
          params: { email }, // Pass the email as a parameter
        });
        setVacancies(response.data); // Assuming response.data contains the vacancies
      } catch (err) {
        setError("Error fetching vacancies: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">View Vacancy</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vacancies.map((vacancy, index) => (
          <div key={index} className="border rounded p-4 shadow-md">
            <h3 className="text-xl font-semibold">{vacancy.ResearchTopic}</h3>
            <p>
              <strong>Faculty Name:</strong> {vacancy.FacultyName}
            </p>
            <p>
              <strong>Required Skills:</strong> {vacancy.RequiredSkills}
            </p>
            <p>
              <strong>Details:</strong> {vacancy.Details}
            </p>
            <p>
              <strong>Paid Research:</strong>{" "}
              {vacancy.PaidResearch ? "Yes" : "No"}
            </p>
            <p>
              <strong>Minimum CGPA:</strong> {vacancy.MinCGPA}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVacancy;
