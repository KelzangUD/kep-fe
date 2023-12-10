import * as React from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Transition from "../../../common/Transition";


const CreateUser = ({ open, setOpen }) => {
  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create new user, please enter Employee ID. Employee's details will
          be fetched and filled.
        </DialogContentText>
        <Box sx={{ display: "grid", gap: 2, mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                name="employeeID"
                required
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" fullWidth size="medium">
                Fetch
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                name="fullName"
                required
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                required
                size="small"
                disabled
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Designation"
                variant="outlined"
                fullWidth
                name="designation"
                required
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-simple-select"
                  // value={age}
                  label="Gender"
                  // onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Contact"
                variant="outlined"
                fullWidth
                name="contact"
                required
                size="small"
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="region-select-label">Region</InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-simple-select"
                  // value={age}
                  label="Region"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Thimphu</MenuItem>
                  <MenuItem value={2}>Paro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="extension-select-label">Extension</InputLabel>
                <Select
                  labelId="extension-select-label"
                  id="extension-simple-select"
                  // value={age}
                  label="Extension"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Head</MenuItem>
                  <MenuItem value={2}>Taba</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl component="fieldset">
                <FormControlLabel
                  value="start"
                  control={<Checkbox />}
                  label="Assign as Admin"
                  labelPlacement="start"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={() => setOpen(false)}>
          Create
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
