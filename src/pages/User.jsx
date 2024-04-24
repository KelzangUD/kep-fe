import React from "react";
import AdminNav from '../layout/admin/AdminNav';
import UserSideNav from "../layout/user/UserSideNav";
import { Box, Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "./user/UserDashboard";
import UserProfile from "./user/UserProfile";
// import Report from "./admin/Report";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  minHeight: "100vh",
}));

const User = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={2}>
            <UserSideNav />
          </Grid>
          <Grid item xs={10}>
            <AdminNav />
            <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <Routes>
                      <Route path="/dashboard" element={<UserDashboard />} />
                      <Route path="/profile" element={<UserProfile />} />
                      {/* <Route path="/profile" element={<Profile />} />
                      <Route path="/report/*" element={<Report />} /> */}
                    </Routes>
                  </Item>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default User;
