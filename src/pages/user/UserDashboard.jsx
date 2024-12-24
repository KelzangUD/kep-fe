import React from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../common/SubHeader";
import UserYearGraph from "../../component/user/user_dashboard/UserYearGraph";

const UserDashboard = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <SubHeader text="Dashboard" />
        <Grid item xs={12} mb={5}>
          <UserYearGraph />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
