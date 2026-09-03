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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import OnlineTest from "../assets/svgs/onlineTest.svg";
import LoginIcon from "@mui/icons-material/Login";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Notification from "../ui/Notification";
import Route from "../routes/Route";
import { setStoredUser } from "../util/CommonUtil";

const SignIn = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigagte = useNavigate();
  const [formData, setFormData] = useState({
    empId: "",
    password: "",
  });
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("info");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Route("POST", "/login", null, formData, null);
    if (res?.status === 200 && res?.data?.user) {
      setStoredUser(res.data.user);
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      res.data.user.isAdmin
        ? navigagte("/admin/dashboard")
        : navigagte("/user/dashboard");
    } else if (res?.status === 200 && !res?.data?.user) {
      setMessage("Login failed: invalid user data received");
      setOpen(true);
      setSeverity("error");
    } else if (res?.status === 206) {
      setMessage(res?.data?.message);
      setOpen(true);
      setSeverity("error");
    } else {
      setMessage(res?.response?.data?.message);
      setOpen(true);
      setSeverity("error");
    }
  };

  const ui = (
    <>
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
          <Grid item xs={12} md={6}>
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
                    name="empId"
                    value={formData.empId}
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
          <Grid item xs={12} md={6}>
            <img
              src={OnlineTest}
              alt="online_test"
              style={{
                width: "90%",
                height: "auto",
                display: "block",
                margin: "0 auto",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
  return (
    <>
      {isMdUp ? <Container>{ui}</Container> : ui}
      {open && (
        <Notification
          open={open}
          setOpen={setOpen}
          message={message}
          severity={severity}
        />
      )}
    </>
  );
};

export default SignIn;
