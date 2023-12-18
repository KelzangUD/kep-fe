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
} from "@mui/material";
import Transition from "../../../../common/Transition";

const AddDesignation = ({ open, setOpen }) => {
  const editHandle = () => {
    setOpen(false);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      TransitionComponent={Transition}
    >
      <DialogTitle>Add Designation</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              required
              size="small"
            />
          </Grid>
          <Grid container>
            <FormControl fullWidth size="small">
              <InputLabel id="select-label">Department/Unit</InputLabel>
              <Select
                labelId="select-label"
                id="select-small"
                // value={age}
                label="Department/Unit"
                // onChange={handleChange}
              >
                <MenuItem value={1}>AND</MenuItem>
                <MenuItem value={2}>CNCS</MenuItem>
                <MenuItem value={3}>FINANCE</MenuItem>
                <MenuItem value={4}>HRAD</MenuItem>
                <MenuItem value={5}>INTERNAT AUDIT UNIT</MenuItem>
                <MenuItem value={6}>MARKETING</MenuItem>
                <MenuItem value={7}>MIS</MenuItem>
                <MenuItem value={8}>SDU</MenuItem>
                <MenuItem value={9}>SPPD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={editHandle}>
          Add
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDesignation;
