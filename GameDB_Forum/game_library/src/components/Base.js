import React, { lazy, Suspense } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Home from "./Home";
import Loading from "./Loading";
import { useAuth } from "../hooks/useAuth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const Games = lazy(() => import("./Games"));
const GameDetails = lazy(() => import("./GameDetails"));
const SpecificPosts = lazy(() => import("./SpecificPosts"));
const Register = lazy(() => import("./Register"));
const Profile = lazy(() => import("./Profile"));
const Post = lazy(() => import("./Post"));
const CreatePost = lazy(() => import("./CreatePost"));
const Contact = lazy(() => import("./Contact"));
const Login = lazy(() => import("./Login"));
const Forum = lazy(() => import("./Forum"));

export default function Base() {
  const { authenticated, loading } = useAuth();

  // if (loading) {
  //   return <Loading />;
  // }

  const getProfile = () => {
    if (loading) {
      return <Loading />;
    }
    return authenticated ? (
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    ) : (
      <Navigate to={"/login"} />
    );
  };

  const getRegister = () => {
    if (loading) {
      return <Loading />;
    }
    return authenticated ? (
      <Navigate to={"/"} />
    ) : (
      <Suspense fallback={<Loading />}>
        <Register />
      </Suspense>
    );
  };

  const getLogin = () => {
    if (loading) {
      return <Loading />;
    }

    return authenticated ? (
      <Navigate to={"/"} />
    ) : (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    );
  };

  const getCreatePost = () => {
    if (loading) {
      return <Loading />;
    }

    return authenticated ? (
      <Suspense fallback={<Loading />}>
        <CreatePost />
      </Suspense>
    ) : (
      <Navigate to={"/login"} />
    );
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/profile" element={getProfile()} />
        <Route exact path="/login" element={getLogin()} />
        <Route exact path="/register" element={getRegister()} />
        <Route
          exact
          path="/games"
          element={
            <Suspense fallback={<Loading />}>
              <Games />
            </Suspense>
          }
        />
        <Route
          exact
          path="/game/:game_id"
          element={
            <Suspense fallback={<Loading />}>
              <GameDetails />
            </Suspense>
          }
        />
        <Route
          exact
          path="/forum/"
          element={
            <Suspense fallback={<Loading />}>
              <Forum />
            </Suspense>
          }
        />
        <Route
          exact
          path="/forum/general"
          element={
            <Suspense fallback={<Loading />}>
              <SpecificPosts type={"general"} />
            </Suspense>
          }
        />
        <Route
          exact
          path="/forum/games"
          element={
            <Suspense fallback={<Loading />}>
              <SpecificPosts type={"game"} />
            </Suspense>
          }
        />
        <Route exact path="/forum/:type/createpost" element={getCreatePost()} />
        <Route
          exact
          path="/forum/:type/post/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Post />
            </Suspense>
          }
        />
        <Route
          exact
          path="/contactus/"
          element={
            <Suspense fallback={<Loading />}>
              <Contact />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}
