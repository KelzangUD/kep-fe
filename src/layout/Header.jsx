import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo.ico";
import { Box, Container, Typography, Button } from "@mui/material";

const Header = () => {
  const navigation = useNavigate();
  const homeHandle = () => {
    navigation("/");
  };
  const signInHandle = () => {
    navigation("/sign-in");
  };
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#F5F7F8", paddingY: 1 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Button variant="text" onClick={homeHandle}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "50px", height: "auto", marginRight: "8px" }}
            />
          </Button>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              color: "#000",
              textDecoration: "none",
            }}
          >
            Knowledge Enhancement Platform
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" onClick={signInHandle}>
            SIGN IN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
