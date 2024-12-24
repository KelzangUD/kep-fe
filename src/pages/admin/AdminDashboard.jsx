import React from "react";
import { Box, Grid } from "@mui/material";
import SubHeader from "../../common/SubHeader";
import LastTestGraph from "../../component/admin/admin_dashboard/LastTestGraph";
import ScoreAnalysis from "../../component/admin/admin_dashboard/ScoreAnlysis";
import TopPerformers from "../../component/admin/admin_dashboard/TopPerformers";
import YearGraph from "../../component/admin/admin_dashboard/YearGraph";

const AdminDashboard = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <SubHeader text="Dashboard" />
        <Grid item container xs={12} spacing={2}>
          <Grid item xs={12} md={6}>
            <LastTestGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <ScoreAnalysis />
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <TopPerformers />
        </Grid>
        <Grid item container xs={12} mb={5}>
          <YearGraph />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
