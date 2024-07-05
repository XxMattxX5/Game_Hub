import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Grid, TextField, Select, Typography, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function SearchBar(props) {
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(""); // Holds search term
  const type = props.suggestionType
    ? props.suggestionType == "generalposts"
      ? "general"
      : "games"
    : "game"; // Holds type of suggestions to be shown
  const [sortBy, setSortBy] = useState(
    params.get("sort") ? params.get("sort") : "sort_by"
  ); // Holds sort option selected
  const sortOptions = props.sortOpts ? props.sortOpts : {}; // Holds list of sort options from parent component
  const searchMessage = props.searchMessage ? props.searchMessage : ""; // Holds search message from parent component
  const [suggestions, setSuggestions] = useState([]); // Holds list of search suggestions

  // Gets new suggestions when search term or url changes
  useEffect(() => {
    getSuggestions();
  }, [searchTerm, location.pathname]);

  // Gets suggestions based on suggestion type and search term
  const getSuggestions = async () => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    let url;
    if (type == "games" || type == "general") {
      url = `/api/get_suggestions/${searchTerm}?type=${type}`;
    } else {
      url = `/igdb/get_suggestions/${searchTerm}`;
    }

    try {
      const response = await axios.get(url);
      setSuggestions(response.data);
    } catch (error) {
      throw new Error("Failed to fetch suggestions");
    }
  };

  // Sets the state when sort input is changed
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    props.sortCallBack(e.target.value);
  };

  // Sets the searchTerm state when search bar input is changed
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Searchs for games when search button is clicked
  const handleSearchClick = () => {
    props.searchClickCallBack(searchTerm);
  };

  return (
    <Grid container id="search_bar">
      <Grid item xs={3} id="search_message_box">
        <Typography variant="h4" id="search_message">
          {searchMessage}
        </Typography>
      </Grid>
      <Grid item xs={8} id="search_box">
        <Grid
          item
          xs={7}
          id="search_input"
          sx={{
            "&:hover #suggestion_dropdown": {
              display: "block",
            },
          }}
        >
          <TextField
            fullWidth
            sx={{
              "& .MuiInputBase-input": { height: 10 },
              "&:focus-within + #suggestion_dropdown": {
                display: "block",
              },
            }}
            placeholder={props.searchMessage ? props.searchMessage : ""}
            onChange={(e) => {
              setTimeout(() => handleSearchChange(e), 500);
            }}
          ></TextField>
          <Grid item id="suggestion_dropdown" zIndex={1}>
            {suggestions.map((suggestion) => (
              <Grid
                item
                key={
                  type == "general" || type == "games"
                    ? suggestion.id
                    : suggestion.game_id
                }
                className="suggestion"
              >
                <Link
                  className="suggestion_link"
                  to={
                    type == "general" || type == "games"
                      ? `/forum/general/post/${suggestion.id}`
                      : `/game/${suggestion.game_id}`
                  }
                >
                  {props.suggestionType ? null : (
                    <img
                      className="suggestion_image"
                      src={
                        suggestion.cover_url
                          ? suggestion.cover_url
                          : "/static/game_library/images/no_image_found.webp"
                      }
                    />
                  )}
                  <Typography className="suggestion_name">
                    {props.suggestionType ? suggestion.title : suggestion.name}
                  </Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item id="search_button">
          <IconButton
            size={"small"}
            id="search_button_icon"
            onClick={handleSearchClick}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item id="sort_by">
          <Select
            size="small"
            fullWidth
            value={sortBy}
            onChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  );
}
