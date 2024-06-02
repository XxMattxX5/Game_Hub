import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Collapse,
  Alert,
  TextField,
} from "@mui/material";
import {
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import { Link } from "react-router-dom";

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState({}); // Holds profile information
  const [newUsername, setNewUsername] = useState(""); // Holds new username input
  const [newEmail, setNewEmail] = useState(""); // Holds new email input
  const [selectedImage, setSelectedImage] = useState(null); // Image selected by user
  const [uploadSuccess, setUploadSuccess] = useState(""); // Upload success message
  const [infoChangeSuccess, setInfoChangeSuccess] = useState(""); // Info change success message
  const [changeInfoErrors, setChangeInfoErrors] = useState({
    error1: "",
    error2: "",
  }); // Info change errors
  const [profileChange, setProfileChange] = useState(false); // Re-grabs profile information when changed
  const [posts, setPosts] = useState([]); // Holds list of posts

  useEffect(() => {
    getProfile();
  }, [profileChange]);

  // Gets profile info
  function getProfile() {
    fetch("/api/get_profile/")
      .then((response) => response.json())
      .then((data) => {
        setProfileInfo(data);
        setNewUsername(data.user.username);
        setNewEmail(data.user.email);
        setPosts(data.posts.post_list);
      });
  }

  // Upload updated profile picture
  function uploadImage() {
    if (!selectedImage) {
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
        image: selectedImage,
      }),
    };

    fetch(`/api/update_profile_pic/`, requestOptions)
      .then((response) => {
        if (response.status === 401) {
          props.authCallBack();
        } else if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to upload image");
        }
      })
      .then((data) => {
        if (!data.error) {
          setProfileChange(profileChange ? false : true);
          setUploadSuccess("Profile image was updated!");
          setSelectedImage(null);
        }
      });
  }

  // Resizes uploaded image to 120x120
  function resizeImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max_width = 120; // Max width for the image
        const max_height = 120; // Max height for the image
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > max_width) {
            height = Math.round((height *= max_width / width));
            width = max_width;
          }
        } else {
          if (height > max_height) {
            width = Math.round((width *= max_height / height));
            height = max_height;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(dataUrl); // Set the resized image as the preview
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Submit username and email changes
  function submitChanges() {
    if (
      newUsername == profileInfo.user.username &&
      newEmail == profileInfo.user.email
    ) {
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
        username: newUsername,
        email: newEmail,
      }),
    };

    fetch(`/api/update_user_info/`, requestOptions)
      .then((response) => {
        if (response.status === 401) {
          props.authCallBack();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data.error) {
          setProfileChange(profileChange ? false : true);
          setInfoChangeSuccess("User Info was Updated!");
          setChangeInfoErrors({});
        } else {
          setChangeInfoErrors(data.error);
        }
      });
  }

  // Handles change the image input field
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      resizeImage(file);
    }
  }

  // Formats date joined
  function formatDate(date) {
    date = new Date(date);
    date =
      String(date.getMonth()) +
      "/" +
      String(date.getDate()) +
      "/" +
      String(date.getFullYear());

    return date;
  }

  // Formats date for post headers
  function formatPostDate(date) {
    date = formatDistanceToNowStrict(new Date(date), {
      addSuffix: false,
    });
    date = "Posted " + date + " ago";
    return date;
  }

  // Gets image to be displayed as preview
  function getImagePreview() {
    if (selectedImage) {
      return selectedImage;
    } else if (profileInfo.user) {
      return "/media/" + profileInfo.user.profile_pic;
    } else {
      return null;
    }
  }

  // Handles changes made to username field
  function handleUsernameChange(e) {
    setNewUsername(e.target.value);
  }

  // Handles changes made to email field
  function handleEmailChange(e) {
    setNewEmail(e.target.value);
  }

  return (
    <Grid container>
      <Grid item xs={10} id="profile_main_content_box">
        <Grid item xs={3} id="profile_info_bar">
          <Grid item id="profile_info_bar_header">
            <Typography variant="h4">Profile Info</Typography>
          </Grid>
          <Grid item id="profile_bar_image">
            <img
              src={
                profileInfo.user
                  ? "/media/" + profileInfo.user.profile_pic
                  : null
              }
            />
          </Grid>
          <Grid item id="profile_bar_username">
            <Typography>
              Username:
              {profileInfo.user ? " " + profileInfo.user.username : ""}
            </Typography>
          </Grid>
          <Grid item id="profile_bar_email">
            <Typography>
              Email:
              {profileInfo.user ? " " + profileInfo.user.email : ""}
            </Typography>
          </Grid>
          <Grid item id="profile_bar_posts">
            <Typography>
              Posts Made:
              {profileInfo.posts ? " " + profileInfo.posts.post_count : 0}
            </Typography>
          </Grid>
          <Grid item id="profile_bar_member_since">
            <Typography>
              Member Since:
              {profileInfo.user
                ? " " + formatDate(profileInfo.user.date_joined)
                : ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9} id="profile_box">
          <Grid item xs={5.5} id="profile_user_info">
            <Grid item xs={12} id="profile_change_profile_pic">
              <Collapse
                id="profile_upload_success_message"
                in={uploadSuccess !== ""}
              >
                <Alert severity="success" onClose={() => setUploadSuccess("")}>
                  {uploadSuccess}
                </Alert>
              </Collapse>
              <Grid item id="profile_image_preview">
                <img src={getImagePreview()}></img>
              </Grid>
              <Grid item id="profile_input_pic">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button id="profile_save_pic" onClick={uploadImage}>
                  <Typography>Save Picture</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid item id="profile_change_info_box">
              <Typography variant="h4" id="profile_change_user_header">
                Change User Information
              </Typography>
              <Collapse
                id="profile_info_change_success"
                in={infoChangeSuccess !== ""}
              >
                <Alert
                  severity="success"
                  onClose={() => setInfoChangeSuccess("")}
                >
                  {infoChangeSuccess}
                </Alert>
              </Collapse>
              <Grid item id="profile_new_username_box" xs={10}>
                <TextField
                  id="profile_new_username"
                  label="Enter Username"
                  value={newUsername}
                  size="small"
                  onChange={handleUsernameChange}
                  fullWidth
                />
              </Grid>
              {changeInfoErrors.error1 ? (
                <Typography class="profile_errors">
                  {changeInfoErrors.error1}
                </Typography>
              ) : null}
              <Grid item id="profile_new_email_box" xs={10}>
                <TextField
                  id="profile_new_email"
                  label="Enter Email"
                  value={newEmail}
                  size="small"
                  onChange={handleEmailChange}
                  fullWidth
                />
              </Grid>
              {changeInfoErrors.error2 ? (
                <Typography class="profile_errors">
                  {changeInfoErrors.error2}
                </Typography>
              ) : null}
              <Grid item id="profile_save_info_changes" xs={10}>
                <Button id="profile_save_info_button" onClick={submitChanges}>
                  <Typography>Save Changes</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5.5} id="profile_postlist">
            <Typography variant="h4" id="profile_post_list_title">
              Posts Created
            </Typography>
            <Grid item id="profile_post_list_box">
              {posts.map((post) => (
                <Grid
                  item
                  xs={11}
                  key={post.created_at}
                  className="profile_post_bar"
                >
                  <Link
                    className="profile_post_bar_link"
                    to={`/forum/${post.game ? "games" : "general"}/post/${
                      post.id
                    }`}
                  >
                    <Grid item className="profile_post_headers">
                      <Typography className="profile_post_username">
                        {post.author_username}
                      </Typography>
                      <span className="post_header_divider">|</span>
                      <Typography className="profile_post_created_at">
                        {formatPostDate(post.created_at)}
                      </Typography>
                      {post.game ? (
                        <span className="post_header_divider">|</span>
                      ) : null}
                      <Typography className="profile_post_game">
                        {post.game ? post.game.name : null}
                      </Typography>
                    </Grid>
                    <Grid item className="profile_post_title">
                      <Typography>{post.title}</Typography>
                    </Grid>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
