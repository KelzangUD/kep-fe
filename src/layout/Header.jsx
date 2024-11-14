import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.ico";
import { Box, Typography, Button } from "@mui/material";

const Header = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [currentLoction, setCurrentLocation] = React.useState();
  const homeHandle = () => {
    navigation("/");
  };
  const signInHandle = () => {
    navigation("/sign-in");
  };
  React.useEffect(()=> {
    setCurrentLocation(location?.pathname);
  },[location]);
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: "#F5F7F8", p: 1 }}>
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
        {
          currentLoction === "/sign-in" ? null : <Box>
          <Button variant="contained" onClick={signInHandle} size="small">
            SIGN IN
          </Button>
        </Box>
        }
        
      </Box>
    </>
  );
};

export default Header;
