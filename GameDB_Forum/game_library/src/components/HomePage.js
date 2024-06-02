import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Games from "./Games";
import SearchBar from "./SearchBar";
import GameDetails from "./GameDetails";
import Login from "./Login";
import Register from "./Register";
import Forum from "./Forum";
import SpecificPosts from "./SpecificPosts";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Contact from "./Contact";
import Profile from "./Profile";
import { Container } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

export default function HomePage() {
  const [key, setKey] = useState(1); // Way to force re-render
  const [authenticated, setAuthenticated] = useState(""); // Holds whether use is signed in
  const [user, setUser] = useState({});

  // Checks if the user is logged in on mount
  useEffect(() => {
    isAuthenticated();
  }, []);

  useEffect(() => {
    if (authenticated == true) {
      getUserInfo();
    } else if (authenticated == false) {
      setUser({});
    }
  }, [authenticated]);

  // Sets and interval for checking if the user is logged in
  useEffect(() => {
    const authInterval = setInterval(isAuthenticated, 5 * 60 * 1000);
    return () => {
      clearInterval(authInterval);
    };
  }, []);

  // Lets components change auth status
  function authChange() {
    setAuthenticated(authenticated ? false : true);
  }

  // Checks if the user is authenticated
  function isAuthenticated() {
    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
    };

    fetch("/api/is_authenticated", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated == true) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      });
  }

  // Gets user informtion if they are logged in.
  function getUserInfo() {
    fetch("/api/get_user/")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }

  // Causes page to re-render
  function changeKey() {
    setKey((prevKey) => prevKey + 1);
  }

  // Renders the home page content
  function renderHome() {
    return (
      <div id="home_about">
        <h2>About Us</h2>
        <p>
          Welcome to Game Hub, your ultimate destination for all things gaming!
          Founded by passionate gamers just like you, our platform is designed
          to be your go-to hub for discovering, discussing, and diving deep into
          the world of games.
        </p>
        <br />
        <p>
          At Game Hub, we believe that gaming is more than just a hobby—it's a
          vibrant community where players from all walks of life come together
          to explore virtual worlds, conquer challenges, and forge unforgettable
          experiences. Whether you're a seasoned veteran or just starting your
          gaming journey, we've got something for everyone.
        </p>
        <br />
        <p>
          What sets us apart? Our comprehensive database boasts a vast
          collection of games from every genre and platform imaginable. From
          timeless classics to the latest releases, you can easily search and
          explore detailed information, reviews, and ratings to find your next
          gaming obsession.
        </p>
        <br />
        <p>
          But Game Hub is more than just a database—it's a thriving community of
          gamers united by their love for all things gaming. Our forum provides
          a space for gamers to connect, share tips and strategies, discuss the
          latest gaming news, and bond over their favorite titles. Whether
          you're looking for advice on a tough boss battle or eager to debate
          the best gaming moments of all time, you'll find like-minded
          individuals ready to join the conversation.
        </p>
        <br />
        <p>
          Driven by our passion for gaming and fueled by the support of our
          amazing community, Game Hub is committed to providing a platform that
          celebrates the diverse and dynamic world of gaming. Join us on our
          quest to explore new realms, challenge epic foes, and create
          unforgettable memories together.
        </p>
        <br />
        <p>Welcome to Game Hub—where the adventure never ends!</p>
      </div>
    );
  }

  function renderProfile() {
    if (authenticated === "") {
      return <h1 color="white">Loading...</h1>;
    }

    return authenticated ? (
      <Profile isAuth={authenticated} />
    ) : (
      <Navigate to={"/"} />
    );
  }

  // Renders the register if the user is not signed in
  function renderRegister() {
    if (authenticated === "") {
      return <h1 color="white">Loading...</h1>;
    }

    return !authenticated ? (
      <Register isAuth={authenticated} authCallBack={authChange} />
    ) : (
      <Navigate to={"/"} />
    );
  }

  // Renders the create a post page if the user is signed in
  function renderCreatePost() {
    const location = window.location.pathname;
    if (authenticated === "") {
      return <h1>Loading...</h1>;
    }

    return authenticated ? (
      <CreatePost isAuth={authenticated} authCallBack={authChange} />
    ) : (
      <Navigate to={`/login/?redirectTo=${location}`} />
    );
  }

  return (
    <Router>
      <NavBar
        keyCallBack={changeKey}
        isAuth={authenticated}
        authCallBack={authChange}
        userInfo={user}
      />

      <Routes>
        <Route exact path="/" element={renderHome()} />
        <Route exact path="/profile" element={renderProfile()} />
        <Route
          exact
          path="/login"
          element={<Login isAuth={authenticated} authCallBack={authChange} />}
        />
        <Route exact path="/register" element={renderRegister()} />
        <Route exact path="/games" element={<Games propKey={key} />} />
        <Route exact path="/game/:game_id" element={<GameDetails />} />
        <Route exact path="/forum/" element={<Forum />} />
        <Route
          exact
          path="/forum/general"
          element={<SpecificPosts type={"general"} />}
        />
        <Route
          exact
          path="/forum/games"
          element={<SpecificPosts type={"game"} />}
        />
        <Route
          exact
          path="/forum/:type/createpost"
          element={renderCreatePost()}
        />
        <Route
          exact
          path="/forum/:type/post/:id"
          element={<Post isAuth={authenticated} authCallBack={authChange} />}
        />
        <Route exact path="/contactus/" element={<Contact />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}
