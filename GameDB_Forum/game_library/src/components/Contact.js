import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import axios from "axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Sends email if all inputs aren't empty
  const sendEmail = async () => {
    if (!name || !email || !subject || !message) {
      return;
    }

    try {
      await axios.post(
        "https://formsubmit.co/ajax/matthewhicks8070@gmail.com",
        {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setSuccess("Email was sent successfully!");
    } catch (error) {
      setError("Email failed to send");
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  // Sets name when change is made the name input
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Sets email when change is made to email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Sets subject when change is made to subject
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Sets message when change is made to message
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

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
          <Collapse id="contact_success_message" in={error !== ""}>
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          </Collapse>
          <Grid item xs={11} id="contact_name_box">
            <TextField
              id="contact_name"
              placeholder="Enter Full Name"
              size="small"
              fullWidth
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_email_box">
            <TextField
              id="contact_email"
              placeholder="Enter Email"
              size="small"
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_subject_box">
            <TextField
              id="contact_subject"
              placeholder="Enter Subject"
              size="small"
              fullWidth
              value={subject}
              onChange={handleSubjectChange}
            />
          </Grid>
          <Grid item xs={11} id="contact_message_box">
            <textarea
              id="contact_message"
              placeholder="Enter Message"
              value={message}
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
