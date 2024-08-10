import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import { ToastContainer } from "react-toastify";
import awsExports from "./aws-exports";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Faculty from "./pages/Faculty";
import Student from "./pages/Student";
import StudentProfile from "./pages/StudentProfile";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator.Provider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/student" element={<Student />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
};

export default App;
