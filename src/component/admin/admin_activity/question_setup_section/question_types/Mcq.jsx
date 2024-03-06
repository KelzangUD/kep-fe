import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const Mcq = () => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer 1"
                  id="your-text"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={1} control={<Radio />} />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer 2"
                  id="your-text"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={2} control={<Radio />} />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer 3"
                  id="your-text"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={3} control={<Radio />} />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Add Answer 4"
                  id="your-text"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={4} control={<Radio />} />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default Mcq;
