import React from "react";
import AdminNav from '../layout/admin/AdminNav';
import SideNav from "../layout/admin/SideNav";
import { Box, Grid, Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Profile from "./admin/Profile";
import AdminDashboard from "./admin/AdminDashboard";
import SystemSetting from "./admin/SystemSetting";
import Master from "./admin/Master";
import Activity from "./admin/Activity";
import Feedbacks from "./admin/Feedbacks";
import Report from "./admin/Report";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  minHeight: "100vh",
}));

const Admin = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={2} sx={{ display: { xs: "none", md: "flex" } }}>
            <SideNav />
          </Grid>
          <Grid item xs={12} md={10}>
            <AdminNav />
            <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <Routes>
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/system-setting/*" element={<SystemSetting />} />
                      <Route path="/master/*" element={<Master />} />
                      <Route path="/activity/*" element={<Activity />} />
                      <Route path="/Feedbacks" element={<Feedbacks />} />
                      <Route path="/report/*" element={<Report />} />
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

export default Admin;
