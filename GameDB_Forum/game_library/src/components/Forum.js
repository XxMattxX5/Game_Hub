import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Forum() {
  const [latestGeneral, setLatestGeneral] = useState({}); // Holds the latest general post
  const [generalCount, setGeneralCount] = useState(0); // Holds the count of general posts in the database
  const [latestGame, setLatestGame] = useState({}); // Holds the latest game post
  const [gameCount, setGameCount] = useState(0); // Holds the count of game posts in the database

  // Grabs the general and game post on mount
  useEffect(() => {
    getPosts("general");
    getPosts("game");
    sessionStorage.clear();
  }, []);

  // Gets posts based on the parameter
  function getPosts(postType) {
    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
    };

    fetch(`/api/get_posts?type=${postType}&amount=${1}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (postType == "general") {
          setLatestGeneral(data.posts[0]);
          setGeneralCount(data.count);
        } else {
          setLatestGame(data.posts[0]);
          setGameCount(data.count);
        }
      });
  }

  return (
    <Grid container>
      <Grid item xs={6} id="forum_home_box">
        <Typography variant="h2" id="forum_page_header">
          Game Hub Forum
        </Typography>
        <Grid item xs={10} className="home_forum_post_box">
          <Grid item xs={12} className="home_forum_post_row1">
            <Typography variant="h6">General Posts</Typography>
            <Typography variant="h6" flexGrow={0.9} align="right">
              {generalCount ? generalCount : 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            padding={"10px"}
            className="home_forum_post_row2"
          >
            <Typography variant="h6">Latest Post</Typography>
            <Typography variant="h6" flexGrow={0.9} align="right">
              {latestGeneral.title ? latestGeneral.title : "No Title"}
            </Typography>
          </Grid>
          <Grid item xs={12} minHeight={300} alignContent={"center"}>
            <Grid item xs={8} margin={"0 auto"}>
              <Typography variant="p" className="latest_post_text">
                {latestGeneral.text ? latestGeneral.text : "No Post"}
              </Typography>
            </Grid>
          </Grid>
          <Link className="forum_home_links" to={"/forum/general/"}>
            View General Posts
          </Link>
        </Grid>

        <Grid item xs={10} className="home_forum_post_box">
          <Grid item xs={12} className="home_forum_post_row1">
            <Typography variant="h6">Game Posts</Typography>
            <Typography variant="h6" flexGrow={0.9} align="right">
              {gameCount ? gameCount : 0}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            padding={"10px"}
            className="home_forum_post_row2"
          >
            <Typography variant="h6">Latest Post</Typography>
            <Typography variant="h6" display={"flex"} flex={1} align="right">
              <Grid item flexGrow={1}>
                {latestGame.game ? latestGame.game.name : ""}
              </Grid>
              <span style={{ margin: "0 5px" }}>|</span>

              {latestGame.title ? latestGame.title : "No Title"}
            </Typography>
          </Grid>
          <Grid item xs={12} minHeight={300} alignContent={"center"}>
            <Grid item xs={8} margin={"0 auto"}>
              <Typography variant="p" className="latest_post_text">
                {latestGame.text ? latestGame.text : "No Post"}
              </Typography>
            </Grid>
          </Grid>
          <Link className="forum_home_links" to={"/forum/games/"}>
            View Game Posts
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
