import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { IoLogoGameControllerB } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  // Sends user back to the top of the page
  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Grid container spacing={1} className="footer">
      <Grid
        item
        xs={12}
        align="center"
        sx={{ backgroundColor: "rgb(10, 10, 10, .8)" }}
      >
        <Typography variant="h6">
          <Button onClick={toTop} fullWidth>
            Back to Top
          </Button>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        className="footer-content"
        justifyContent="center"
        align="center"
        sx={{ backgroundColor: "rgb(0, 0, 0, .8)" }}
      >
        <Grid
          item
          xs={4}
          align="center"
          alignItems="top"
          className="footer_column"
        >
          <IoLogoGameControllerB size={100} />
          <Typography variant="p" display="block">
            Game Hub
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          align="center"
          marginTop={4}
          className="footer_column"
        >
          <Grid item>
            <Typography variant="p" display="block">
              Follow Us
            </Typography>
          </Grid>
          <Grid item justifyContent="center" display="flex" columnGap={1}>
            <Grid item>
              <BsTwitter size={25} />
            </Grid>
            <Grid item>
              <FaFacebookSquare size={25} />
            </Grid>
            <Grid item>
              <FaInstagram size={25} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} marginTop={4} className="footer_column">
          <Grid item>
            <Typography>
              Address: Apt. 330 7659 Emmaline Coves, Haneborough, IA 51911
            </Typography>
          </Grid>
          <Grid item>
            <Typography>Phone Number: +1 (624) 454-9861</Typography>
          </Grid>
          <Grid item>
            <Typography variant="p">
              <Button to="/contactus" component={Link}>
                Email Us
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Link to={"https://github.com/XxMattxX5/Game_Hub"} id="git_link">
        GitHub
      </Link>
    </Grid>
  );
}
