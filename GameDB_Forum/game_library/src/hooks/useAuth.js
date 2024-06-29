import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null); // Holds authentication status
  const [user, setUser] = useState(null); // Holds user information
  const [loading, setLoading] = useState(true); // Makes the page go into loading state if auth null

  useEffect(() => {
    const checkAuth = async () => {
      isAuthenticated();
    };
    checkAuth();

    const authInterval = setInterval(isAuthenticated, 5 * 60 * 1000);
    return () => {
      clearInterval(authInterval);
    };
  }, []);

  // Checks if the user is authenticated
  const isAuthenticated = async () => {
    try {
      const response = await axios.get("/api/is_authenticated");
      if (response.data.authenticated == true) {
        setAuthenticated(true);
        await getUserInfo();
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    } catch (error) {
      setAuthenticated(false);
      setLoading(false);
    }
  };

  // Gets a user's information if they are logged in
  const getUserInfo = async () => {
    try {
      const response = await axios("/api/get_user");
      setUser(response.data);
    } catch (error) {
      logoutUser();
    }
  };

  // Logins in user if credentials are correct
  const loginUser = async (username, password) => {
    try {
      const response = await axios.post(
        "/api/login/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      setAuthenticated(true);
      setUser(response.data);
      return;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return error.response.data.error;
      }
    }
  };

  // Creates a new account if input is valid
  const register = async (username, email, password, passwordConfirm) => {
    try {
      await axios.post(
        "/api/register/",
        {
          username: username,
          email: email,
          password1: password,
          password2: passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      return "Success";
    } catch (error) {
      return error.response.data.error;
    }
  };

  // Logs out a user
  const logoutUser = async () => {
    try {
      await axios("/api/logout/");
      setAuthenticated(false);
      setUser(null);
    } catch (error) {
      setAuthenticated(false);
      setUser(null);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user, loading, register, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
