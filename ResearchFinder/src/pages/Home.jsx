import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-800">
      <div className="flex flex-col justify-center items-center shadow-lg bg-purple-700 h-[400px] w-[400px] rounded-lg p-6">
        <h1 className="text-white text-2xl font-bold mb-4">Select Your Role</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/student">
              <Button
                variant="contained"
                className="bg-slate-100 text-black hover:bg-slate-200"
                fullWidth
              >
                Student
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/faculty">
              <Button
                variant="contained"
                className="bg-slate-100 text-black hover:bg-slate-200"
                fullWidth
              >
                Faculty
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
