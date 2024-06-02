import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Grid, Typography, Button, Alert, Collapse } from "@mui/material";

export default function Login(props) {
  const location = useLocation();
  const navigate = useNavigate();
  // const [authenticated, setAuthenticated] = useState(props.isAuth || false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState("");
  const [justCreated, setJustCreated] = useState(false);

  // Redirects user if they are logged in
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get("redirectTo");

    if (props.isAuth) {
      navigate(redirectTo == null ? "/" : redirectTo);
    }
  }, [props.isAuth]);

  // Displays account created message if user just created an account
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const created = searchParams.get("created");
    if (created) {
      setJustCreated(true);
    }
  }, []);

  // Logins in user if inputs match user credentials
  function login() {
    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    fetch("/api/login/", requestOptions)
      .then((response) => {
        if (response.status === 401) {
          props.authCallBack();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          setSigninError(data.error);
        } else {
          props.authCallBack();
        }
      });
  }

  // Handles changes to the username input
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // Handles Changes to the password input
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

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
