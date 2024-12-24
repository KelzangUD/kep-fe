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

const YesOrNo = ({answerHandle}) => {
  return (
    <>
      <Box px={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 0.5 }}>
              <Grid item xs={11} md={1}>
                <TextField
                  fullWidth
                  label="Yes"
                  id="yes"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={1} control={<Radio onChange={() => answerHandle("Yes")} />} />
              </Grid>
              <Grid item xs={11} md={5}>
                <TextField
                  fullWidth
                  label="No"
                  id="no"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel value={2} control={<Radio onChange={() => answerHandle("No")} />} />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default YesOrNo;
