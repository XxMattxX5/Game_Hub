import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { formatDistanceToNowStrict } from "date-fns";
import axios from "axios";

export default function SpecificPosts(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search); // Holds search params
  const search = params.get("search") ? params.get("search") : ""; // Holds search word
  const page = params.get("page") ? params.get("page") : 1; // Holds current page
  const sort = params.get("sort") ? params.get("sort") : "sort_by"; // Holds sort option
  const sortOptions = [
    { value: "sort_by", text: "Sort By" },
    { value: "title", text: "Title" },
    { value: "created_at", text: "Created" },
  ]; // Holds list of sort options for search bar
  const [posts, setPosts] = useState([]); // Holds list of posts
  const [pages, setPages] = useState([]); // Holds list of page number for navigation

  // Gets updated post and scrolls to top when url changes
  useEffect(() => {
    getPosts(props.type);
    window.scrollTo(0, 0);
  }, [location.search]);

  // Changes url when search word or sort option selected
  const changeURL = (searchWord = search, page_num = page, sortOp = sort) => {
    let url = `/forum/${
      props.type == "general" ? props.type : "games"
    }/?page=${page_num}`;

    if (searchWord) {
      url += `&search=${searchWord}`;
    }
    if (sortOp && sortOp != "sort_by") {
      url += `&sort=${sortOp}`;
    }

    navigate(url);
  };

  // Gets a list of posts
  const getPosts = async (postType) => {
    try {
      const response = await axios.get(
        `/api/get_posts?type=${postType}&search=${search}&page=${page}&amount=${10}&sort=${sort}`
      );
      setPages(response.data.pages);
      setPosts(response.data.posts);
    } catch (error) {
      throw new Error("Failed to fetch posts");
    }
  };

  // Handles changes to the sort option
  const handleSortChange = (change) => {
    changeURL(undefined, undefined, change);
  };

  // Handles search button click
  const handleSearchClick = (change) => {
    changeURL(change, 1, "sort_by");
  };

  // Formats date for post
  const formatDate = (date) => {
    date = formatDistanceToNowStrict(new Date(date), {
      addSuffix: false,
    });
    date = "Posted " + date + " ago";
    return date;
  };

  // Handles change to the current page
  const handlePageChange = (change) => {
    if (change > 0 && change <= parseInt(pages[pages.length - 1])) {
      changeURL(undefined, change, undefined);
    }
  };

  return (
    <Grid container>
      <SearchBar
        searchMessage={
          props.type == "general"
            ? "Search For General Posts"
            : "Search For Game Posts"
        }
        sortCallBack={handleSortChange}
        searchClickCallBack={handleSearchClick}
        sortOpts={sortOptions}
        suggestionType={props.type == "general" ? "generalposts" : "gameposts"}
      />

      <Grid item xs={6} margin="0 auto" id="post_list_box">
        <Grid item xs={12} id="post_list_content_box">
          <Link to={"/forum/"} id="go_back_link">
            <FaLongArrowAltLeft size={50} color="#1976D2" />

            <Typography marginLeft={"10px"} color={"#1976d2"}>
              Go Back
            </Typography>
          </Link>

          <Typography variant="h2" id="post_list_header">
            {props.type == "game" ? "Game Posts" : "General Posts"}
          </Typography>
          <Link
            style={{ textDecoration: "none" }}
            to={
              props.type == "general"
                ? "/forum/general/createpost"
                : "/forum/games/createpost"
            }
          >
            <Grid item xs={12} id="new_post_link">
              <Typography variant="h4">Create New Post</Typography>
            </Grid>
          </Link>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id} className="post">
              <Grid item xs={12} className="post_head">
                <Grid item xs={12} className="post_headers">
                  <Typography className="post_username">
                    {post ? post.author_username : ""}
                  </Typography>
                  {post ? <span className="post_header_divider">|</span> : null}
                  <Typography className="post_created">
                    {post.created_at ? formatDate(post.created_at) : ""}
                  </Typography>
                  {post.game ? (
                    <span className="post_header_divider">|</span>
                  ) : null}
                  <Grid item className="post_game">
                    {props.type == "game" ? (
                      <Typography className="post_game_name">
                        {post.game ? post.game.name : ""}
                      </Typography>
                    ) : null}
                    {post.game ? (
                      <Link to={`/game/${post.game.game_id}`}>
                        <Grid item display={"flex"} className="post_game_info">
                          <img
                            className="post_game_image"
                            src={
                              post.game.cover_url
                                ? post.game.cover_url
                                : "/static/game_library/images/no_image_found.webp"
                            }
                          />
                          <Typography className="post_game_text">
                            {(
                              post.game.storyline
                                ? post.game.storyline
                                : post.game.summary
                            )
                              ? post.game.storyline
                                ? post.game.storyline
                                : post.game.summary
                              : "No Storyline/Summary"}
                          </Typography>
                        </Grid>
                      </Link>
                    ) : null}
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography className="post_title">
                    {post ? post.title : ""}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} className="post_text">
                <Typography variant="p">{post ? post.text : ""}</Typography>
                <Link
                  className="post_links"
                  to={
                    props.type == "general"
                      ? `/forum/general/post/${post.id}`
                      : `/forum/games/post/${post.id}`
                  }
                >
                  View Post
                </Link>
              </Grid>
            </Grid>
          ))}
          <Grid item align={"center"} margin="20px 0px">
            <Button
              onClick={() => {
                handlePageChange(parseInt(page) - 1);
              }}
            >
              <BsArrowLeftSquareFill size={30} />
            </Button>
            {pages.map((pageItem) => (
              <Button
                key={pageItem}
                onClick={() => {
                  handlePageChange(pageItem);
                }}
                className={
                  parseInt(pageItem) == parseInt(page) ? "current_page" : null
                }
              >
                {pageItem}
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
  );
}
