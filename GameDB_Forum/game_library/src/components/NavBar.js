import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";
import { IoLogoGameControllerB } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { logoutUser, authenticated, user } = useAuth();
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const pages = [
    ["Home", "/"],
    ["Games", "/games/"],
    ["Forum", "/forum/"],
    ["Contact Us", "/contactus/"],
  ]; // List of pages and their urls

  // Logs out user
  const handleLogout = () => {
    logoutUser();
  };

  // Toggle nav side bar
  const toggle_side_nav = () => {
    setShowSideBar(showSideBar ? false : true);
  };

  // Toggles user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(showUserDropdown ? false : true);
  };

  // Loads user information if user is logged in
  const loadUser = () => {
    return (
      <Grid container justifyContent={"right"}>
        <Grid item position={"relative"}>
          <Button id="nav_user_box" onClick={toggleUserDropdown}>
            <Grid item xs={8}>
              <img id="nav_profile_pic" src={user ? user.profile_pic : null} />
            </Grid>
            <Grid item xs={4} id="nav_profile_down_arrow">
              <IoMdArrowDropdown size={20} />
            </Grid>
          </Button>
          <Grid
            item
            id="nav_user_dropdown"
            style={{ display: showUserDropdown ? "block" : "none" }}
          >
            <Typography>Hi, {user ? user.username : null}</Typography>
            <Grid item>
              <Link id="nav_profile_link" to={"/profile/"}>
                <Typography>View Profile</Typography>
              </Link>
            </Grid>
            <Button onClick={handleLogout}>
              <Typography fontSize={17}>Logout</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <AppBar
      id="nav"
      position="relative"
      sx={{ backgroundColor: "rgb(0, 0, 0, .5)" }}
    >
      <Toolbar id="nav_bar">
        <Grid
          container
          display="flex"
          alignItems="center"
          position={"relative"}
          paddingLeft={"24px"}
        >
          <Grid item xs={1.5} id="nav_logo">
            <Typography fontSize={30}>Game Hub </Typography>
            <IoLogoGameControllerB style={{ marginLeft: "10px" }} size={30} />
          </Grid>
          <Grid item id="nav_links">
            {pages.map((page) => (
              <Grid key={page[0]} item>
                <Button
                  onClick={() => setShowUserDropdown(false)}
                  to={page[1]}
                  component={Link}
                >
                  <Typography variant="p" fontSize={19}>
                    {page[0]}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            id="side_nav"
            style={{ left: showSideBar ? "0px" : "-180px" }}
          >
            <Grid item id="side_bar">
              <Grid item xs={1.5} id="side_logo">
                <Typography fontSize={30}>Game Hub </Typography>
                <IoLogoGameControllerB
                  style={{ marginLeft: "10px" }}
                  size={30}
                />
              </Grid>

              <Grid item id="side_links">
                {pages.map((page) => (
                  <Grid key={page[0]} item>
                    <Button
                      className={
                        location.pathname == page[1]
                          ? "current_page nav_link_buttons"
                          : "nav_link_buttons"
                      }
                      to={page[1]}
                      component={Link}
                    >
                      <Typography variant="p" fontSize={19}>
                        {page[0]}
                      </Typography>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Button id="toggle_side_nav" onClick={toggle_side_nav}>
              <GiHamburgerMenu size={25} />
            </Button>
          </Grid>
          <Grid
            item
            id="login_logout_button"
            align={"right"}
            paddingRight={5}
            flex={1}
          >
            {authenticated ? (
              loadUser()
            ) : (
              <Button to={`/login`} component={Link}>
                <Typography fontSize={19}>Login</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
