import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Alert,
  Collapse,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreatePost() {
  const { logoutUser } = useAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // Holds new title for creating post
  const [text, setText] = useState(""); // Holds new text for creating post
  const [game, setGame] = useState(null); // Holds game if the post being created is a gamepost
  const [search, setSearch] = useState(""); // Search word for selecting game
  const [suggestions, setSuggestions] = useState([]); // Holds suggestions for search bar
  const [errorMSG, setErrorMSG] = useState(""); // Holds error message if inputs are invalid

  // Gets new suggestions everytime search word changes
  useEffect(() => {
    getSuggestions();
  }, [search]);

  // Gets post suggestions based on the search input
  const getSuggestions = async () => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(`/igdb/get_suggestions/${search}`, {});
      setSuggestions(response.data);
    } catch (error) {
      console.error(error);
      console.error("Failed to fetch suggestions");
    }
  };

  // Creates a new post if inputs are valid
  const CreatePost = async () => {
    try {
      const response = await axios.post(
        `/api/post/`,
        {
          postType: params.type,
          title: title,
          game: game ? game.game_id : "",
          text: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      navigate(`/forum/${params.type}/`);
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
      } else {
        console.log(error.response);
        setErrorMSG(error.response.data.error);
      }
    }
  };

  // Handles changes to the title input
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handles changes to the search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handles changes to the text input
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Handles changes to the selected game
  const selectGame = (selectedGame) => {
    setGame(selectedGame);
  };

  // Clears the game from the select game input
  const clearGame = () => {
    setGame("");
    setSuggestions([]);
  };

  // Displays search error message
  const showErrorMSG = () => {
    if (errorMSG != "") {
      return (
        <Alert
          id="create_post_alert"
          severity="error"
          onClose={() => {
            setErrorMSG("");
          }}
        >
          {errorMSG}
        </Alert>
      );
    }
  };

  return (
    <Grid container align="center">
      <Grid item xs={6} id="new_post_box">
        <Link to={`/forum/${params.type}`} id="go_back_link">
          <FaLongArrowAltLeft size={50} color="#1976D2" />

          <Typography marginLeft={"10px"} color={"#1976d2"}>
            Go Back
          </Typography>
        </Link>
        <Typography variant="h2" id="create_post_header">
          Create a New Post
        </Typography>
        <Collapse id="search_error" in={errorMSG != ""}>
          {showErrorMSG()}
        </Collapse>
        <Grid item xs={12} margin={"0 auto"}>
          <label htmlFor="new_post_title">Enter Title:</label>
          <input
            onChange={handleTitleChange}
            maxLength={80}
            type="text"
            name="new_post_title"
            id="new_post_title"
            placeholder="Title"
          />
        </Grid>
        <Grid item xs={12} margin={"20px auto"}>
          {params.type == "games" ? (
            game ? (
              <Grid
                item
                className="new_post_selected_game"
                backgroundColor="white"
              >
                <img
                  className="suggestion_image"
                  src={
                    game.cover_url
                      ? game.cover_url
                      : "/static/game_library/images/no_image_found.webp"
                  }
                />
                <Typography className="suggestion_name">{game.name}</Typography>
                <HiXMark
                  size={30}
                  style={{ marginLeft: "auto", marginRight: "30px" }}
                  onClick={clearGame}
                  cursor={"pointer"}
                />
              </Grid>
            ) : (
              <Grid
                item
                sx={{
                  "&:hover #new_post_game_suggestions": {
                    display: "block",
                  },
                }}
              >
                <label htmlFor="new_post_game">Select a Game:</label>
                <TextField
                  name="new_post_game"
                  id="new_post_game"
                  placeholder="Look for Game"
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "4px",
                    "& .MuiInputBase-input": {
                      fontSize: 18,
                      height: 12,
                      padding: 1,
                    },
                    "&:focus-within + #new_post_game_suggestions": {
                      display: "block",
                    },
                  }}
                  onChange={(e) => {
                    setTimeout(() => handleSearchChange(e), 500);
                  }}
                />
                <Grid id="new_post_game_suggestions" backgroundColor={"white"}>
                  {suggestions.map((suggestion) => (
                    <Grid
                      item
                      key={suggestion.game_id}
                      onClick={() => selectGame(suggestion)}
                      display={"flex"}
                      className="new_post_suggestion"
                    >
                      <img
                        className="suggestion_image"
                        src={
                          suggestion.cover_url
                            ? suggestion.cover_url
                            : "/static/game_library/images/no_image_found.webp"
                        }
                      />
                      <Typography className="suggestion_name">
                        {suggestion.name}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )
          ) : null}
        </Grid>
        <Grid item xs={12} margin={"0 auto"}>
          <label htmlFor="new_post_text">Enter Text:</label>
          <textarea
            onChange={handleTextChange}
            id="new_post_text"
            name="new_post_text"
            placeholder="Text"
          />
        </Grid>
        <Grid item xs={12} margin={"0 auto"}>
          <Button onClick={CreatePost} id="create_post_button">
            <Typography>Create Post</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
