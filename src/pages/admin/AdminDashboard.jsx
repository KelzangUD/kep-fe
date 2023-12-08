import React from "react";
import { Box, Grid, Divider, Typography } from "@mui/material";
import LastTestGraph from "../../components/admin/LastTestGraph";
import ScoreAnalysis from "../../components/admin/ScoreAnlysis";
import SixMonthGraph from "../../components/admin/SixMonthGraph";

const AdminDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Dashboard
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <Grid item xs={6}>
              <LastTestGraph />
            </Grid>
            <Grid item xs={6}>
              <ScoreAnalysis />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
          <SixMonthGraph />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
