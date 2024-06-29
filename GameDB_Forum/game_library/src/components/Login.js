import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Grid, Typography, Button, Alert } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

export default function Login(props) {
  const { loginUser } = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");
  const [justCreated, setJustCreated] = useState(false);

  // Displays account created message if user just created an account
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const created = searchParams.get("created");
    if (created) {
      setJustCreated(true);
    }
  }, []);

  // Logins in user if inputs match user credentials
  const login = async () => {
    const response = await loginUser(username, password);
    if (response) {
      setSigninError(response);
    }
  };

  // Handles changes to the username input
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handles Changes to the password input
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Grid container alignContent="center" justifyContent={"center"}>
      <Grid item xs={3} id="login_block">
        <Grid item xs={12}>
          <Typography variant="h2" id="login_header">
            Login
          </Typography>
        </Grid>
        {justCreated ? (
          <Alert
            id="account_created_alert"
            severity="success"
            onClose={() => {
              setJustCreated(false);
            }}
          >
            {"Account was created successfully"}
          </Alert>
        ) : null}

        <Grid item xs={12}>
          <label htmlFor="login_username" align="left">
            Username:
          </label>
          <input
            type="text"
            id="login_username"
            name="login_username"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Grid>

        <Grid item xs={12}>
          <label htmlFor="login_password">Password:</label>
          <input
            type="password"
            id="login_password"
            name="login_password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
        </Grid>
        {signinError ? (
          <Typography color={"red"}>{signinError}</Typography>
        ) : null}
        <Grid item xs={12}>
          <Button id="login_submit" onClick={login}>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid item id="login_register" xs={7}>
            <Typography>Don't have an account:</Typography>
            <Link id="login_register_link" to={"/register/"}>
              Register
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
