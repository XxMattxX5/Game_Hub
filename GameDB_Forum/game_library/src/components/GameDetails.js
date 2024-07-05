import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ImageVideoCarousel from "./ImageVideoCarousel";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Grid, Typography, Collapse, Alert } from "@mui/material";
import axios from "axios";

export default function GameDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [sortBy, setSortBy] = useState("sort_by"); // Holds the selected sort options
  const [game, setGame] = useState({}); // Holds the details of the game from the url
  const [videos, setVideos] = useState([]); // Holds a list of video urls related to the game
  const [screenshots, setScreenshots] = useState([]); // Holds a list of screenshot urls related to the game
  const [errorMSG, setErrorMSG] = useState(""); // Holds error message to display

  const sortOptions = [
    { value: "sort_by", text: "Sort By" },
    { value: "name", text: "Name" },
    { value: "first_released", text: "Release" },
  ]; // Holds sort options for search bar

  // Grabs game details everytime url changes
  useEffect(() => {
    getGameDetails();
  }, [location.pathname]);

  // Scrolls user to the top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // Gets the game details using the game id in the paramaters
  const getGameDetails = async () => {
    try {
      const response = await axios.get(`/igdb/get_game/${params.game_id}`);
      setGame(response.data.data);
      setVideos(response.data.videos);
      setScreenshots(response.data.screenshots);
    } catch (error) {
      setErrorMSG(error.response.data.error);
    }
  };

  // Displays search error message
  const showErrorMSG = () => {
    if (errorMSG != "") {
      return (
        <Alert
          severity="error"
          onClose={() => {
            setSearchTerm("");
            setErrorMSG("");
          }}
        >
          {errorMSG}
        </Alert>
      );
    }
  };

  // Gets the title video for the game
  const getGameVideo = () => {
    if (videos.length > 0) {
      return videos[0].url;
    }
    return "https://www.youtube.com/embed/YZ0Qbemz4lI";
  };

  // Formats the release date for the game
  const getReleaseDate = () => {
    if (Object.entries(game).length !== 0) {
      if (game.first_released != null) {
        let date = new Date(game.first_released);
        date =
          String(date.getMonth()) +
          "/" +
          String(date.getDate()) +
          "/" +
          String(date.getFullYear());

        return date;
      }
    }
    return "No Release Date";
  };

  // Sets state when there is a change the sort option
  const handleSortChange = (change) => {
    setSortBy(change);
  };

  // Storages search information and redirects the user to the search page
  const handleSearchClick = (change) => {
    navigate(`/games/?page=${1}&search=${change}`);
  };

  return (
    <Grid container marginBottom={1}>
      <SearchBar
        searchMessage={"Search For Games"}
        sortCallBack={handleSortChange}
        searchClickCallBack={handleSearchClick}
        sortOpts={sortOptions}
      />
      <Collapse id="search_error" in={errorMSG != ""}>
        {showErrorMSG()}
      </Collapse>
      <Grid item xs={12} align="center">
        <Grid item id="game_title_release" xs={6} align="left">
          <Typography variant="h3">{game.name}</Typography>
          <Typography variant="h5">{getReleaseDate()}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            background:
              "linear-gradient(to top, #282c33 50%, rgba(0, 0, 0, 0) 0%)",
          }}
        >
          <Grid item xs={6} id="game_details_part1">
            <Grid item xs={4} id="game_detail_image">
              <img
                id="game_detail_image_image"
                src={
                  game.cover_url
                    ? game.cover_url
                    : "/static/game_library/images/no_image_found.webp"
                }
              ></img>
            </Grid>
            <Grid item xs={8} id="game_title_video_box">
              <iframe
                id="game_detail_title_video"
                key={game.game_id}
                src={getGameVideo()}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} id="game_details_header">
          <Typography variant="p">Game Details</Typography>
        </Grid>
        <Grid item xs={12} id="game_details">
          <Grid item xs={6} id="game_genre_age">
            <Grid item xs={12} sx={{ minHeight: 130 }}>
              <Typography variant="h3" sx={{ marginBottom: 3 }}>
                Genres
              </Typography>
              {game.genres ? (
                game.genres.map((genre) => (
                  <Typography key={genre.name} variant="p" fontSize={20}>
                    {genre.name + " "}
                  </Typography>
                ))
              ) : (
                <Typography variant="p" fontSize={20}>
                  No Genres Listed
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sx={{ minHeight: 130 }}>
              <Typography variant="h3" sx={{ marginBottom: 3 }}>
                Age Rating
              </Typography>
              <Typography variant="p1" fontSize={20}>
                {game.rating ? game.rating : "No Age Rating"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} id="game_storyline_summary">
            <Typography variant="h3" id="summary_storyline_header">
              Summary/Storyline
            </Typography>
            <Typography variant="p" id="summary_storyline_text">
              {(game.storyline ? game.storyline : game.summary)
                ? game.storyline
                  ? game.storyline
                  : game.summary
                : "No Storyline/Summary"}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} id="game_videos_screenshots_header">
          <Typography variant="p">Videos and Screenshots</Typography>
        </Grid>
        <ImageVideoCarousel videos={videos} images={screenshots} visible={3} />
      </Grid>
    </Grid>
  );
}
