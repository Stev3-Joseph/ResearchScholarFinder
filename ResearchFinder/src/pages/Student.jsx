import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button } from "@aws-amplify/ui-react";
import axios from "axios";

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

  // Fetch students data from the backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students. Please try again.");
    }
  };

  useEffect(() => {
    fetchStudents(); // Call the function to fetch students when the component mounts
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Student Page</h1>
      <Button onClick={signOutHandler}>Sign Out</Button>

      {error && <p className="text-red-500">{error}</p>}

      {students.length > 0 ? (
        <ul className="mt-4">
          {students.map((student, index) => (
            <li key={index} className="border p-2 mb-2">
              <p>
                <strong>Name:</strong> {student.Name}
              </p>
              <p>
                <strong>Registration Number:</strong>{" "}
                {student["Registration Number"]}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No students found.</p>
      )}
    </div>
  );
};

export default Student;
