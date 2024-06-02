import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  // Sends email if all inputs aren't empty
  function sendEmail() {
    if (!name || !email || !subject || !message) {
      return;
    }

    fetch("https://formsubmit.co/ajax/matthewhicks8070@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => setSuccess("Email was sent successfully!"))
      .catch((error) => console.log(error));

    document.getElementById("contact_email").value = "";
    document.getElementById("contact_name").value = "";
    document.getElementById("contact_subject").value = "";
    document.getElementById("contact_message").value = "";
  }

  // Sets name when change is made the name input
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Sets email when change is made to email
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // Sets subject when change is made to subject
  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }

  // Sets message when change is made to message
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <Grid container>
      <Grid item xs={6} id="contact_content_box">
        <Typography variant="h1" id="contact_page_header">
          Contact Us!
        </Typography>
        <Grid item xs={12} id="contact_info_box">
          <Typography id="contact_info_header" variant="h2">
            Contact Info
          </Typography>
          <Grid item xs={6} id="contact_phonenumber_box">
            <Typography variant="h4">Phone Number</Typography>
            <Typography>+1 (624) 454-9861</Typography>
          </Grid>
          <Grid item xs={6} id="contact_email_address_box">
            <Typography variant="h4">Email</Typography>
            <Typography>FakeEmail@gmail.com</Typography>
          </Grid>
          <Grid item xs={6} id="contact_address_box">
            <Typography variant="h4">Address</Typography>
            <Typography>
              Apt. 330 7659 Emmaline Coves, Haneborough, IA 51911
            </Typography>
          </Grid>
          <Grid item xs={6} id="contact_hours_box">
            <Typography variant="h4">Hours</Typography>
            <ul id="contact_hours_list">
              <li>
                <Typography>Monday: 9am-5pm</Typography>
              </li>
              <li>
                <Typography>Tuesday: 9am-5pm</Typography>
              </li>
              <li>
                <Typography>Wednesday: 9am-5pm</Typography>
              </li>
              <li>
                <Typography>Thursday: 9am-5pm</Typography>
              </li>
              <li>
                <Typography>Friday: 9am-3pm</Typography>
              </li>
              <li>
                <Typography>Saturday: Closed</Typography>
              </li>
              <li>
                <Typography>Sunday: Closed</Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid item xs={12} id="contact_form_box">
          <Typography id="contact_form_header" variant="h2">
            Send us an Email!
          </Typography>
          <Collapse id="contact_success_message" in={success !== ""}>
            <Alert severity="success" onClose={() => setSuccess("")}>
              {success}
            </Alert>
          </Collapse>
          <Grid item xs={11} id="contact_name_box">
            <TextField
              id="contact_name"
              placeholder="Enter Full Name"
              size="small"
              fullWidth
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_email_box">
            <TextField
              id="contact_email"
              placeholder="Enter Email"
              size="small"
              fullWidth
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_subject_box">
            <TextField
              id="contact_subject"
              placeholder="Enter Subject"
              size="small"
              fullWidth
              onChange={handleSubjectChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_message_box">
            <textarea
              id="contact_message"
              placeholder="Enter Message"
              onChange={handleMessageChange}
            />
          </Grid>
          <Grid item xs={11} id="send_email_box">
            <Button id="send_email_button" fullWidth onClick={sendEmail}>
              <Typography>Send Email</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
