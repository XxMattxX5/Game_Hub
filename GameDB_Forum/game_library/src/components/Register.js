import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function Register(props) {
  const { register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Holds username for new account
  const [email, setEmail] = useState(""); // Holds email for new account
  const [password1, setPassword1] = useState(""); // Holds password1 for new account
  const [password2, setPassword2] = useState(""); // Holds password2 for new account
  const [created, setCreated] = useState(false); // Status for if an account is created
  const [errors, setErrors] = useState({
    error1: "",
    error2: "",
    error3: "",
    error4: "",
    error5: "",
  }); // Holds input errors

  // Redirects user if they have created an account
  useEffect(() => {
    if (created) {
      navigate("/login?created=true");
    }
  });

  // Redirects user if they already logged in
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get("redirectTo");

    if (props.isAuth) {
      navigate(redirectTo == null ? "/" : redirectTo);
    }
  }, [props.isAuth]);

  // Creates new account if inputs are valid
  const registerUser = async () => {
    const response = await register(username, email, password1, password2);
    if (response == "Success") {
      setCreated(true);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        error1: response.error1,
        error2: response.error2,
        error3: response.error3,
        error4: response.error4,
        error5: response.error5,
      }));
    }
  };

  // Handles changes to the username input
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // Handles changes to the email input
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // Handles changes to the password1 input
  function handlePassword1Change(e) {
    setPassword1(e.target.value);
  }

  // Handles changes to the password2 input
  function handlePassword2Change(e) {
    setPassword2(e.target.value);
  }

  return (
    <Grid container alignContent="center" justifyContent={"center"}>
      <Grid item xs={3} id="login_block">
        <Grid item xs={12}>
          <Typography variant="h2" id="login_header">
            Register
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="register_username" align="left">
            Username:
          </label>
          <input
            className="register_inputs"
            type="text"
            id="register_username"
            name="register_username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Typography variant="span" className="register_errors">
            {errors.error1}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label htmlFor="register_email" align="left">
            Email:
          </label>
          <input
            className="register_inputs"
            type="email"
            id="register_email"
            name="register_email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Grid>
        <Typography variant="span" className="register_errors">
          {errors.error2}
        </Typography>
        <Grid item xs={12}>
          <label htmlFor="register_password1">Password:</label>
          <input
            className="register_inputs"
            type="password"
            id="register_password1"
            name="register_password1"
            placeholder="Enter password"
            value={password1}
            onChange={handlePassword1Change}
            autoComplete="new-password"
          />
        </Grid>
        <Typography variant="span" className="register_errors">
          {errors.error3}
        </Typography>
        <Grid item xs={12}>
          <label htmlFor="register_password2">Confirm Password:</label>
          <input
            className="register_inputs"
            type="password"
            id="register_password2"
            name="register_password2"
            placeholder="Confirm Password"
            value={password2}
            onChange={handlePassword2Change}
            autoComplete="new-password"
          />
        </Grid>
        <Typography variant="span" className="register_errors">
          {errors.error4}
        </Typography>
        <Grid item xs={12}>
          <Button id="register_submit" onClick={registerUser}>
            Register
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
