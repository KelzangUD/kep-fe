import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr 1fr" }}>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />} size="large" color="primary" sx={{ width: "fit-content", mt: 2 }}>
              Submit
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default Contact;
