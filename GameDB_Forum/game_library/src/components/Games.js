import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
  Grid,
  Card,
  Typography,
  Button,
  Collapse,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { HiMiniXMark } from "react-icons/hi2";
import axios from "axios";

export default function Games() {
  const location = useLocation();
  const navigate = useNavigate();
  let params = new URLSearchParams(location.search); // Holds all the url search params
  const search = params.get("search") ? params.get("search") : ""; // Holds the word used to search
  let page = params.get("page") ? params.get("page") : 1; // Holds the current page being displayed
  const sort = params.get("sort") ? params.get("sort") : "sort_by"; // Holds the current sort option selected
  let filters = {
    filter1: params.get("filter1") ? params.get("filter1") : null,
    filter2: params.get("filter2") ? params.get("filter2") : null,
    filter3: params.get("filter3") ? params.get("filter3") : "genre",
    filter4: params.get("filter4") ? params.get("filter4") : "",
  }; // Holds the selected filters

  const [errorMSG, setErrorMSG] = useState(""); // Holds error message to be displayed
  const [games, setGames] = useState([]); // Holds a list of games
  const [pages, setPages] = useState([]); // Hold list of page number for navigation
  const [genres, setGenres] = useState([]);
  const sortOptions = [
    { value: "sort_by", text: "Sort By" },
    { value: "name", text: "Name" },
    { value: "first_released", text: "Release" },
  ]; // Holds sort options for search bar
  // Grabs games everytime url changes
  useEffect(() => {
    getGames(search, page, sort, filters);
  }, [location.search]);

  // Changes url when user changes search word, sort option, or filters
  const changeURL = (
    searchWord = search,
    page_num = page,
    sortOp = sort,
    filts = filters
  ) => {
    window.scrollTo(0, 0);
    let url = `/games/?page=${page_num}`;

    if (searchWord) {
      url += `&search=${searchWord}`;
    }
    if (sortOp && sortOp != "sort_by") {
      url += `&sort=${sortOp}`;
    }
    if (filts.filter1) {
      url += `&filter1=${filts.filter1}`;
    }
    if (filts.filter2) {
      url += `&filter2=${filts.filter2}`;
    }
    if (filts.filter3 && filts.filter3 != "genre") {
      url += `&filter3=${filts.filter3}`;
    }
    if (filts.filter4) {
      url += `&filter4=${filts.filter4}`;
    }

    navigate(url);
  };

  // Gets games from database
  const getGames = async (search, page, sort, filts) => {
    try {
      const response = await axios.get(
        `/igdb/get_games?search=${search}&page=${page}&filter1=${filts.filter1}&filter2=${filts.filter2}&filter3=${filts.filter3}&filter4=${filts.filter4}&sort=${sort}`
      );
      setGames(response.data.data);
      setPages(response.data.pages);
      setGenres(response.data.genres);
    } catch (error) {
      setErrorMSG(error.response.data.error);
    }
  };

  // Sets the state when sort input is changed
  const handleSortChange = (change) => {
    changeURL(undefined, undefined, change, undefined);
  };

  // Searchs for games when search button is clicked
  const handleSearchClick = (change) => {
    const filts = {
      filter1: null,
      filter2: null,
      filter3: "genre",
      filter4: "",
    };
    changeURL(change, 1, "sort_by", filts);
  };

  // Changes the page number when the error or a number is clicked
  const handlePageChange = (page_num) => {
    if (page_num > 0 && page_num <= pages[pages.length - 1]) {
      changeURL(undefined, page_num, undefined, undefined);
    }
  };

  // Handles any changes to the filters
  const handleFilterChange = (e, filter) => {
    if ((filter == "filter1" || filter == "filter2") && e != null) {
      let date = new Date(e);

      e =
        String(date.getMonth() + 1) +
        "/" +
        String(date.getDate()) +
        "/" +
        String(date.getFullYear());
    }
    if (filter == "filter3" || filter == "filter4") {
      e = e.target.value;
    }

    if (filter == "filter1") {
      filters.filter1 = e;
    } else if (filter == "filter2") {
      filters.filter2 = e;
    } else if (filter == "filter3") {
      filters.filter3 = e;
    } else if (filter == "filter4") {
      filters.filter4 = e;
    }
    page = 1;
    changeURL();
  };

  // Displays search error message
  const showErrorMSG = () => {
    if (errorMSG != "") {
      return (
        <Alert
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SearchBar
          searchMessage={"Search For Games"}
          sortCallBack={handleSortChange}
          searchClickCallBack={handleSearchClick}
          sortOpts={sortOptions}
        />
        <Collapse id="search_error" in={errorMSG != ""}>
          {showErrorMSG()}
        </Collapse>
        <Grid item id="games_content">
          <Grid item xs={2} id="games_filter_container" align="center">
            <Typography variant="h4" id="filters_header">
              Filters
            </Typography>
            <Grid item className="filters">
              <Typography className="filter_labels" id="filter1_label">
                Release Before
              </Typography>
              <Grid item className="filter_input_box">
                <DatePicker
                  placeholderText="MM/DD/YYYY"
                  isClearable={true}
                  id="filter1"
                  value={filters.filter1}
                  onChange={(e) => handleFilterChange(e, "filter1")}
                />
                {filters.filter1 && (
                  <Button
                    className="filter_clear_button"
                    onClick={() => {
                      handleFilterChange(null, "filter1");
                    }}
                  >
                    <HiMiniXMark />
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item className="filters">
              <Typography className="filter_labels" id="filter2_label">
                Release After
              </Typography>
              <Grid item className="filter_input_box">
                <DatePicker
                  placeholderText="MM/DD/YYYY"
                  isClearable={true}
                  id="filter2"
                  value={filters.filter2}
                  onChange={(e) => handleFilterChange(e, "filter2")}
                />
                {filters.filter2 && (
                  <Button
                    className="filter_clear_button"
                    onClick={() => {
                      handleFilterChange(null, "filter2");
                    }}
                  >
                    <HiMiniXMark />
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid item className="filters" overflow={"hidden"}>
              <Typography className="filter_labels" id="filter3_label">
                Genre
              </Typography>
              <Select
                value={filters.filter3}
                id="filter3"
                sx={{
                  height: 23,
                  minHeight: 10,
                  fontSize: 14,
                  width: 155,
                  overflow: "hidden",
                }}
                onChange={(e) => handleFilterChange(e, "filter3")}
              >
                <MenuItem value="genre">Select Genre</MenuItem>
                {genres.map((genre) => (
                  <MenuItem value={genre.name} key={genre.name}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item id="games_container">
            {games.map((game) => (
              <Link
                key={game.game_id}
                to={`/game/${game.game_id}`}
                className="search_game_link"
              >
                <Card className="game_card">
                  <img
                    className="search_game_image"
                    src={
                      game.cover_url
                        ? game.cover_url
                        : "/static/game_library/images/no_image_found.webp"
                    }
                  />
                  <Typography variant="h6" className="search_game_name">
                    {game.name}
                  </Typography>
                  {game.genres
                    ? game.genres.map((genre) => (
                        <Typography
                          key={genre.name}
                          variant="p"
                          className="search_game_genres"
                        >
                          {genre.name + " "}
                        </Typography>
                      ))
                    : null}
                </Card>
              </Link>
            ))}
            <Grid item id="page_buttons">
              <Button
                onClick={() => {
                  handlePageChange(parseInt(page) - 1);
                }}
              >
                <BsArrowLeftSquareFill size={30} />
              </Button>
              {pages.map((page) => (
                <Button
                  onClick={() => {
                    handlePageChange(page);
                  }}
                  key={page}
                  className={
                    parseInt(page) ==
                    parseInt(params.get("page") ? params.get("page") : 1)
                      ? "current_page"
                      : null
                  }
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => {
                  handlePageChange(parseInt(page) + 1);
                }}
              >
                <BsArrowRightSquareFill size={30} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
