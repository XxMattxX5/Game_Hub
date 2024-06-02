import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function Post(props) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState({}); // Holds post details
  const [comments, setComments] = useState([]); // Holds post comments
  const [errorMSG, setErrorMSG] = useState(""); // Holds error message to display
  const [sort, setSort] = useState("sort_by"); // Holds sort option selected
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
  function getPostDetails() {
    fetch(`/api/post/${params.id}?type=${params.type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data.post);
        setComments(data.comments);
      });
  }

  // Formats post, comment, reply date
  function formatDate(date) {
    date = formatDistanceToNowStrict(new Date(date), {
      addSuffix: false,
    });
    date = "Posted " + date + " ago";
    return date;
  }

  // Displays reply input box if user hits reply button
  function displayReplyInput(e) {
    const reply_inputs = document.querySelectorAll(".post_reply_input");
    reply_inputs.forEach((input) => {
      input.style.display = "none";
      input.querySelector("textarea").value = "";
    });
    const reply_box = e.target
      .closest(".post_comment")
      .querySelector(".post_reply_input");
    reply_box.style.display = "block";
  }

  // Submits a comment to a post
  function submitComment(e, id) {
    const comment = e.target
      .closest(".post_comment_reply_box")
      .querySelector(".post_comment_input")
      .querySelector("textarea").value;

    if (!comment) {
      return;
    }
    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({
        post_type: params.type,
        post_id: id,
        comment: comment,
      }),
    };

    fetch(`/api/add_comment/`, requestOptions)
      .then((response) => {
        if (response.status === 401) {
          props.authCallBack();
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add comment");
        }
      })
      .then((data) => {
        if (!data.error) {
          getPostDetails();
        }
      });
  }

  // Submits a reply to a comment
  function submitReply(e, id) {
    const reply = e.target
      .closest(".post_comment_reply_box")
      .querySelector(".post_comment_input")
      .querySelector("textarea").value;

    if (!reply) {
      return;
    }

    const csrf_token = document.getElementsByName("csrfmiddlewaretoken")[0]
      .value;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({
        comment_id: id,
        reply: reply,
      }),
    };

    fetch(`/api/add_reply/`, requestOptions)
      .then((response) => {
        if (response.status === 401) {
          props.authCallBack();
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add reply");
        }
      })
      .then((data) => {
        if (!data.error) {
          getPostDetails();
        }
      });
  }

  // Handles changes to the sort options
  function handleSortChange(change) {
    setSort(change);
  }

  // Navigates user to search page if search button is clicked
  function handleSearchClick(change) {
    navigate(`/forum/${params.type}/?page=1&search=${change}`);
  }

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
            {props.isAuth ? (
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
                />
                <Button
                  className="post_comment_submit"
                  onClick={(e) => submitComment(e, post.id)}
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
                    onClick={displayReplyInput}
                  >
                    <Typography>Reply</Typography>
                  </Button>
                </Grid>
                <Typography variant="p" className="post_comment_text">
                  {comment.text}
                </Typography>
                <Grid item className="post_reply_input">
                  {props.isAuth ? (
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
                      />
                      <Button
                        className="post_comment_submit"
                        onClick={(e) => submitReply(e, comment.id)}
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
