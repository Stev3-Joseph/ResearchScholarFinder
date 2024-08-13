import React, { useState, useEffect } from "react";
import { useAuthenticator, Button } from "@aws-amplify/ui-react";
import { toast } from "react-toastify";
import axios from "axios";

const AddVacancy = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const email = user?.signInDetails?.loginId;

  const [showForm, setShowForm] = useState(false);
  const [vacancyDetails, setVacancyDetails] = useState({
    FacultyName: "", // Initially empty, will be set from the GET request
    ResearchTopic: "",
    RequiredSkills: "",
    Details: "",
    PaidResearch: false,
    MinCGPA: "",
    Email: email, // Set the logged-in user's email
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/getfacultyprofile",
          {
            params: { email }, // Assuming you're passing email to fetch profile
          }
        );
        // Set the FacultyName from the response
        if (response.data) {
          setVacancyDetails((prev) => ({
            ...prev,
            FacultyName: response.data.Name, // Set fetched name
          }));
        }
      } catch (error) {
        toast.error("Error fetching profile: " + error.message);
      }
    };

    fetchProfile();
  }, [email]); // Dependency array includes email to fetch the profile once on mount

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVacancyDetails((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/addvacancy", {
        ...vacancyDetails,
        FacultyEmail: email, // Use the logged-in user's email
      });
      toast.success("Vacancy posted successfully!");
      setShowForm(false); // Hide the form after submission
      setVacancyDetails({
        FacultyName: "",
        ResearchTopic: "",
        RequiredSkills: "",
        Details: "",
        PaidResearch: false,
        MinCGPA: "",
      }); // Reset form
    } catch (error) {
      toast.error("Error posting vacancy: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Vacancy</h2>
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Vacancy
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
          <div className="mb-4">
            <label className="block mb-1">Faculty Name:</label>
            <input
              type="text"
              name="FacultyName"
              value={vacancyDetails.FacultyName}
              onChange={handleChange}
              required
              disabled // Make it non-editable
              className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Faculty Email:</label>
            <input
              type="email"
              name="FacultyEmail"
              value={email} // Set the value to the logged-in user's email
              disabled // Make it non-editable
              className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Research Topic:</label>
            <input
              type="text"
              name="ResearchTopic"
              value={vacancyDetails.ResearchTopic}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Required Skills:</label>
            <input
              type="text"
              name="RequiredSkills"
              value={vacancyDetails.RequiredSkills}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Details:</label>
            <textarea
              name="Details"
              value={vacancyDetails.Details}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="PaidResearch"
                checked={vacancyDetails.PaidResearch}
                onChange={handleChange}
                className="mr-2"
              />
              Paid Research
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Minimum CGPA:</label>
            <input
              type="number"
              name="MinCGPA"
              value={vacancyDetails.MinCGPA}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Post
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AddVacancy;
