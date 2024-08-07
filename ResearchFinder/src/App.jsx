import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Faculty from "./pages/Faculty";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/student"
            element={
              <PrivateRoute>
                <Student />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty"
            element={
              <PrivateRoute>
                <Faculty />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
