import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import OnlineTest from "../assets/svgs/onlineTest.svg";
import LoginIcon from "@mui/icons-material/Login";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const SignIn = () => {
  const navigagte = useNavigate();
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
    navigagte("/admin/dashboard");
  };

  return (
    <Container>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6}>
            <Container maxWidth="xs" sx={{ py: 2 }}>
              <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Welcome Back
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "grid", gap: 2 }}>
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
          </Grid>
          <Grid item xs={6}>
            <img
              src={OnlineTest}
              alt="online_test"
              style={{ width: "90%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Container>
  );
};

export default SignIn;
