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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Transition from "../../../../common/Transition";

const EditExtension = ({ details, open, setOpen }) => {
  const addHandle = () => {
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
      <DialogTitle>Edit Extension</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Extension"
              variant="outlined"
              fullWidth
              name="extension"
              defaultValue={details?.extension}
              required
              size="small"
            />
          </Grid>
          <Grid container>
            <FormControl fullWidth size="small">
              <InputLabel id="region-select-label">Region</InputLabel>
              <Select
                labelId="region-select-label"
                id="region-simple-select"
                // value={age}
                required
                defaultValue={details?.region}
                label="Region"
                // onChange={handleChange}
              >
                <MenuItem value={1}>Thimphu</MenuItem>
                <MenuItem value={2}>Paro</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              defaultValue={details?.description}
              required
              size="small"
              multiline
              rows={3}
            />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mx: 2 }}>
        <Button variant="contained" onClick={addHandle}>
          Add
        </Button>
        <Button onClick={() => setOpen(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExtension;
