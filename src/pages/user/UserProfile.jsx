import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubHeader from "../../common/SubHeader";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    empId: "",
    name: "",
    email: "",
    designation: "",
    gender: "",
    contact: "",
    region: "",
    extension: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      empId: user?.empId,
      name: user?.name,
      email: user?.email,
      designation: user?.designation,
      gender: user?.gender,
      contact: user?.contact,
      region: user?.region,
      extension: user?.extension,
    }));
  }, []);
  return (
    <Box sx={{ px: 2 }}>
      <Grid container spacing={4} alignItems="center">
        <SubHeader text="Profile" />
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={4}>
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  name="employeeID"
                  defaultValue={userDetails?.empId}
                  required
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  name="fullName"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={8}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="designation-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="designation-select-label"
                    id="designation-simple-select"
                    label="Designation"
                  >
                    <MenuItem value="Male">Manager</MenuItem>
                    <MenuItem value="Female">CCE</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-simple-select"
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  name="contact"
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="region-select-label">Region</InputLabel>
                  <Select
                    labelId="region-select-label"
                    id="region-simple-select"
                    label="Region"
                  >
                    <MenuItem value={1}>Thimphu</MenuItem>
                    <MenuItem value={2}>Paro</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="extension-select-label">Extension</InputLabel>
                  <Select
                    labelId="extension-select-label"
                    id="extension-simple-select"
                    label="Extension"
                  >
                    <MenuItem value={1}>Head</MenuItem>
                    <MenuItem value={2}>Taba</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ my: 2, display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Button variant="contained" size="large" sx={{ mr: 2 }}>
                  Update
                </Button>
                <Button variant="outlined" color="error" size="large">
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
