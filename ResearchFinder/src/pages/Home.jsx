import React from "react";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-800">
      <div className="flex flex-col justify-center items-center shadow-lg bg-purple-700 h-[400px] w-[400px] rounded-lg p-6">
        <h1 className="text-white text-2xl font-bold mb-4">Select Your Role</h1>
        <ul className="space-y-4">
          <li>
            <Button
              variant="contained"
              className="bg-slate-100 text-black hover:bg-slate-200"
              fullWidth
            >
              Student
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              className="bg-slate-100 text-black hover:bg-slate-200"
              fullWidth
            >
              Faculty
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
