import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", py: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Knowlegement Enhancement Plateform
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              © 2023 Software Development Unit
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid>
            <IconButton aria-label="facebook">
              <LanguageIcon />
            </IconButton>
            <IconButton aria-label="facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="insta">
              <InstagramIcon />
            </IconButton>
            </Grid>
            <Grid>
              
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
