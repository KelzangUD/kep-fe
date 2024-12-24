import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/logo.ico";
import { Box, Typography, Button, Grid } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigation = useNavigate();
  const location = useLocation();
  const [currentLoction, setCurrentLocation] = React.useState();
  const homeHandle = () => {
    navigation("/");
  };
  const signInHandle = () => {
    navigation("/sign-in");
  };
  React.useEffect(() => {
    setCurrentLocation(location?.pathname);
  }, [location]);
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "#F5F7F8",
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid item display="flex" alignItems="center">
          <Button variant="text" onClick={homeHandle}>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "50px", height: "auto", marginRight: "8px" }}
            />
          </Button>
          <Typography
            variant={isMdUp ? "h6" : "caption"}
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
        </Grid>
        {currentLoction === "/sign-in" ? null : (
          <Grid item>
            <Button variant="contained" onClick={signInHandle} size="small">
              SIGN IN
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Header;
