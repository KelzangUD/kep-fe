import React from "react";
import { Grid, Breadcrumbs, Typography } from "@mui/material";

const SubHeader = ({ text }) => {
  return (
    <Grid item xs={12}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Typography key="1" color="inherit">
          HOME
        </Typography>{" "}
        ,
        <Typography key="2" variant="button" sx={{ color: "text.primary" }}>
          {text}
        </Typography>
        ,
      </Breadcrumbs>
    </Grid>
  );
};

export default SubHeader;
