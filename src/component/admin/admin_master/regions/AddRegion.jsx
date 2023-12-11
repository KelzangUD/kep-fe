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
} from "@mui/material";
import Transition from "../../../../common/Transition";

const AddRegion = ({ open, setOpen }) => {
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
      <DialogTitle>Add Region</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "grid", gap: 3, mt: 2 }}>
          <Grid container>
            <TextField
              label="Region"
              variant="outlined"
              fullWidth
              name="region"
              required
              size="small"
            />
          </Grid>
          <Grid container>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
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

export default AddRegion;
