import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import { IoLogoGameControllerB } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdown } from "react-icons/io";

export default function NavBar(props) {
  const location = useLocation();
  const pages = [
    ["Home", "/"],
    ["Games", "/games/"],
    ["Forum", "/forum/"],
    ["Contact Us", "/contactus/"],
  ]; // List of pages and their urls

  // Logs out user
  function handleLogout() {
    fetch("/api/logout/").then(() => {
      props.authCallBack();
    });
  }

  // Toggle nav side bar
  function toggle_side_nav() {
    let sideNav = document.querySelector("#side_nav");
    const toggleSide = document.querySelector("#toggle_side_nav");
    const sideStyles = window.getComputedStyle(sideNav);
    if (sideStyles.left == "-180px") {
      sideNav.style.left = "0px";
      toggleSide.style.left = "170px";
    } else {
      sideNav.style.left = "-180px";
      toggleSide.style.left = "180px";
    }
  }

  // Toggles user dropdown
  function toggleUserDropdown() {
    const dropdown = document.querySelector("#nav_user_dropdown");
    const dropStyle = window.getComputedStyle(dropdown);
    if (dropStyle.display == "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }

  // Loads user information if user is logged in
  function loadUser() {
    return (
      <Grid container justifyContent={"right"}>
        <Grid item position={"relative"}>
          <Button id="nav_user_box" onClick={toggleUserDropdown}>
            <Grid item xs={8}>
              <img
                id="nav_profile_pic"
                src={props.userInfo ? props.userInfo.profile_pic : null}
              />
            </Grid>
            <Grid item xs={4} id="nav_profile_down_arrow">
              <IoMdArrowDropdown size={20} />
            </Grid>
          </Button>
          <Grid item id="nav_user_dropdown">
            <Typography>
              Hi, {props.userInfo ? props.userInfo.username : null}
            </Typography>
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
  }

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
                <Button to={page[1]} component={Link}>
                  <Typography variant="p" fontSize={19}>
                    {page[0]}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
          <Grid container id="side_nav">
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
            {props.isAuth ? (
              loadUser()
            ) : (
              <Button
                to={`/login?redirectTo=${location.pathname}`}
                component={Link}
              >
                <Typography fontSize={19}>Login</Typography>
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
