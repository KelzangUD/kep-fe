import * as React from "react";
import {
  Grid,
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Transition from "../../../common/Transition";

const EditUser = ({ details, open, setOpen }) => {
  const handleSubmit = () => {
    // Handle form submission logic here
  };
  React.useEffect(() => {
    console.log(details);
  }, []);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Employee ID"
                variant="outlined"
                fullWidth
                defaultValue={details?.employeeID}
                name="employeeID"
                required
                size="small"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                defaultValue={details?.name}
                name="fullName"
                required
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                defaultValue={details?.email}
                required
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="designation-select-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="designation-select-label"
                  id="designation-simple-select"
                  // value={age}
                  defaultValue={details?.designationId}
                  label="Designation"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>Manager</MenuItem>
                  <MenuItem value={2}>CCE</MenuItem>
                  <MenuItem value={3}>Software Developer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  defaultValue={details?.gender}
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
                defaultValue={details?.contactNo}
                required
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="region-select-label">Region</InputLabel>
                <Select
                  defaultValue={details?.region}
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
                  defaultValue={details?.extension}
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
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormControlLabel
                  checked={details?.isAdmin}
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
          Update
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
