import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { formatDistanceToNowStrict } from "date-fns";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Cookies from "js-cookie";

export default function Post() {
  const { logoutUser, authenticated } = useAuth();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState({}); // Holds post details
  const [comments, setComments] = useState([]); // Holds post comments
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [sort, setSort] = useState("sort_by"); // Holds sort option selected
  const [visibleReply, setVisibleReply] = useState(null); // Number of visible reply input box
  const sortOptions = [
    { value: "sort_by", text: "Sort By" },
    { value: "title", text: "Title" },
    { value: "created_at", text: "Created" },
  ]; // Holds sort options for search bar

  // Grabs post details when url changes
  useEffect(() => {
    getPostDetails();
  }, [location.pathname]);

  // Gets the post details using id in url
  const getPostDetails = async () => {
    try {
      const response = await axios.get(
        `/api/post/?type=${params.type}&id=${params.id}`
      );
      setPost(response.data.post);
      setComments(response.data.comments);
    } catch (error) {
      throw new Error("Post not found");
    }
  };

  // Formats post, comment, reply date
  const formatDate = (date) => {
    date = formatDistanceToNowStrict(new Date(date), {
      addSuffix: false,
    });
    date = "Posted " + date + " ago";
    return date;
  };

  // Submits a comment to a post
  const submitComment = async (id) => {
    if (!newComment) {
      return;
    }

    try {
      await axios.post(
        `/api/add_comment/`,
        {
          post_type: params.type,
          post_id: id,
          comment: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      setNewComment("");
      getPostDetails();
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
      } else {
        throw new Error("Failed to add comment");
      }
    }
  };

  // Submits a reply to a comment
  const submitReply = async (id) => {
    if (!newReply) {
      return;
    }

    try {
      await axios.post(
        "/api/add_reply/",
        {
          comment_id: id,
          reply: newReply,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        }
      );
      setNewReply("");
      getPostDetails();
    } catch (error) {
      if (error.response.status === 401) {
        logoutUser();
      } else {
        throw new Error("Failed to add reply");
      }
    }
  };

  // Handles changes to the sort options
  const handleSortChange = (change) => {
    setSort(change);
  };

  // Navigates user to search page if search button is clicked
  const handleSearchClick = (change) => {
    navigate(`/forum/${params.type}/?page=1&search=${change}`);
  };

  // Handles change to comment input
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handles changes to reply input
  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  return (
    <Grid container>
      <SearchBar
        searchMessage={
          params.type == "general"
            ? "Search For General Posts"
            : "Search For Game Posts"
        }
        sortCallBack={handleSortChange}
        searchClickCallBack={handleSearchClick}
        sortOpts={sortOptions}
        suggestionType={params.type == "general" ? "generalposts" : "gameposts"}
      />

      <Grid item xs={6} id="post_content_box">
        <Link to={`/forum/${params.type}`} id="go_back_link">
          <FaLongArrowAltLeft size={50} color="#1976D2" />

          <Typography marginLeft={"10px"} color={"#1976d2"}>
            Go Back
          </Typography>
        </Link>
        <Grid item xs={12} className="post">
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
                {params.type == "games" ? (
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
          </Grid>
        </Grid>
        <Grid item xs={12} id="post_comment_box">
          <Grid item xs={12} id="post_make_comment">
            {authenticated ? (
              <Grid item className="post_comment_reply_box">
                <TextField
                  className="post_comment_input"
                  multiline={true}
                  label={"Enter your comment"}
                  fullWidth
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    "& .MuiInputBase-root": {
                      paddingRight: "60px",
                    },
                  }}
                  value={newComment}
                  onChange={handleCommentChange}
                />
                <Button
                  className="post_comment_submit"
                  onClick={() => submitComment(post.id)}
                >
                  <FaArrowAltCircleUp color="black" size={35} />
                </Button>
              </Grid>
            ) : (
              <Typography variant="h5" color={"white"}>
                You must be signed in to comment
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} id="post_comments">
            {comments.map((comment) => (
              <Grid item xs={12} key={comment.id} className="post_comment">
                <Grid item className="post_comment_header">
                  <Typography className="post_username">
                    {comment.author_username}
                  </Typography>
                  <span className="post_header_divider">|</span>
                  <Typography className="post_created">
                    {formatDate(comment.created_at)}
                  </Typography>
                  <span className="post_header_divider">|</span>
                  <Button
                    className="post_reply_button"
                    // onClick={displayReplyInput}
                    onClick={() => setVisibleReply(comment.id)}
                  >
                    <Typography>Reply</Typography>
                  </Button>
                </Grid>
                <Typography variant="p" className="post_comment_text">
                  {comment.text}
                </Typography>
                <Grid
                  item
                  className="post_reply_input"
                  style={{
                    display: visibleReply == comment.id ? "block" : "none",
                  }}
                >
                  {authenticated ? (
                    <Grid item className="post_comment_reply_box">
                      <TextField
                        className="post_comment_input"
                        multiline={true}
                        label={`Reply to ${comment.author_username}`}
                        fullWidth
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",

                          "& .MuiInputBase-root": {
                            paddingRight: "60px",
                          },
                        }}
                        value={newReply}
                        onChange={handleReplyChange}
                      />
                      <Button
                        className="post_comment_submit"
                        onClick={() => submitReply(comment.id)}
                      >
                        <FaArrowAltCircleUp color="black" size={35} />
                      </Button>
                    </Grid>
                  ) : (
                    <Typography variant="h5" color="white">
                      You must be signed in to comment
                    </Typography>
                  )}
                </Grid>
                {comment.replies.map((reply) => (
                  <Grid item xs={11} key={reply.id} className="post_reply">
                    <Grid item className="post_reply_header">
                      <Typography className="post_username">
                        {reply.author_username}
                      </Typography>
                      <span className="post_header_divider">|</span>
                      <Typography className="post_created">
                        {formatDate(reply.created_at)}
                      </Typography>
                    </Grid>
                    <Typography variant="p" className="post_comment_text">
                      {reply.text}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
