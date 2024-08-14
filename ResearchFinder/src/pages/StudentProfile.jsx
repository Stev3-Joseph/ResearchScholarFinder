import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Error fetching profile.");
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
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <nav className="bg-gray-100 shadow-lg w-full py-4">
        <h1 className="text-center text-xl font-bold text-gray-800">
          Student Profile
        </h1>
      </nav>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl mt-4">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Hi {profile.Name}!
        </h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(profile).map(([key, value]) => (
            <div className="mb-6" key={key}>
              <label
                htmlFor={key}
                className="block text-gray-700 font-medium mb-2"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}:
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
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentProfile;
