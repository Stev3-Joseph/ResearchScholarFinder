import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-react";

const StudentProfile = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const email = user?.signInDetails?.loginId;

  const [profile, setProfile] = useState({
    Name: "",
    Email: email || "",
    RegistrationNumber: "",
    CGPA: "",
    School: "",
    FieldOfInterest: "",
    Experience: "",
    RelatedWork: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getprofile?email=${email}`
        );
        setProfile({ ...response.data, Email: email || "" });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (email) fetchProfile();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/updateprofile", profile);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Student Profile
      </h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(profile).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label
              htmlFor={key}
              className="block text-gray-700 font-medium mb-2"
            >
              {key}:
            </label>
            <input
              type={
                key === "Email" ? "email" : key === "CGPA" ? "number" : "text"
              }
              id={key}
              name={key}
              value={value ?? ""}
              onChange={handleChange}
              disabled={key === "Email"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
