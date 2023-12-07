import React, { useState } from "react";
import {
  Card,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign-in submitted:", formData);
  };

  return (
    <Container>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Card sx={{ minWidth: 500 }}>
          <Container maxWidth="xs" sx={{ py: 6 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "grid", gap: 3}}>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  endIcon={<LoginIcon />}
                >
                  Sign In
                </Button>
              </Box>
            </form>
          </Container>
          </Card>
      </Box>
      <Footer />
    </Container>
  );
};

export default SignIn;
