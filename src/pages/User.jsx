import React from "react";
import AdminNav from "../layout/admin/AdminNav";
import UserSideNav from "../layout/user/UserSideNav";
import { Box, Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./user/UserDashboard";
import Profile from "./admin/Profile";
import UserActivity from "./user/UserActivity";
import UserReport from "./user/UserReport";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)((theme) => ({
  borderRadius: 0,
  minHeight: "100vh",
}));

const User = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={2} sx={{ display: { xs: "none", md: "flex" } }}>
          <UserSideNav />
        </Grid>
        <Grid item xs={12} md={10}>
          <AdminNav />
          <Grid container>
            <Grid item xs={12}>
              <Item>
                <Routes>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/activity/*" element={<UserActivity />} />
                  <Route path="/report/*" element={<UserReport />} />
                </Routes>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default User;
