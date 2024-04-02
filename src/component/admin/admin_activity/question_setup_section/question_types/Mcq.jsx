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

const Mcq = ({choiceHandle, answerHandle}) => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 1"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("1", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={1} control={<Radio onChange={(e) => answerHandle(parseInt(e.target.value))} />} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 2"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("2", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={2} control={<Radio onChange={(e) => answerHandle(parseInt(e.target.value))} />} />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 3"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("3", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={3} control={<Radio onChange={(e) => answerHandle(parseInt(e.target.value))} />} />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Option 4"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("4", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={4} control={<Radio onChange={(e) => answerHandle(parseInt(e.target.value))} />} />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default Mcq;
