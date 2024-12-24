import React from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const EditTrueOrFalse = ({ options, answerHandle }) => {
  return (
    <>
      <RadioGroup
        aria-labelledby="group-label"
        name="radio-group"
        defaultValue={options[0].isTrue ? true : false}
      >
        <Grid container spacing={1} mt={1}>
          <Grid item xs={10} md={5}>
            <TextField
              fullWidth
              label="True"
              id="true"
              variant="outlined"
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              value={true}
              control={<Radio onChange={() => answerHandle(true)} />}
            />
          </Grid>
          <Grid item xs={10} md={5}>
            <TextField
              fullWidth
              label="False"
              id="false"
              variant="outlined"
              disabled
              size="small"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              value={false}
              control={<Radio onChange={() => answerHandle(false)} />}
            />
          </Grid>
        </Grid>
      </RadioGroup>
    </>
  );
};

export default EditTrueOrFalse;
