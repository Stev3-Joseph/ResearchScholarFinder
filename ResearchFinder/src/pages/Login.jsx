import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, TextField, Typography, Box, Tab, Tabs } from "@mui/material";

const Login = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await Auth.signIn(username, password);
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setIsConfirming(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await Auth.confirmSignUp(username, confirmationCode);
      setIsConfirming(false);
      setTabIndex(0); // Switch to login tab
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-slate-800">
      <Box className="bg-white p-8 rounded-lg shadow-md w-96">
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {tabIndex === 0 && (
          <form onSubmit={handleLogin} className="mt-4">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Login
            </Button>
          </form>
        )}

        {tabIndex === 1 && !isConfirming && (
          <form onSubmit={handleRegister} className="mt-4">
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Register
            </Button>
          </form>
        )}

        {isConfirming && (
          <form onSubmit={handleConfirmation} className="mt-4">
            <TextField
              label="Confirmation Code"
              fullWidth
              margin="normal"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Confirm Registration
            </Button>
          </form>
        )}

        {error && (
          <Typography color="error" className="mt-4">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
