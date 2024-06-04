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

const TrueOrFalseOptions = ({
  options,
  point,
  setResult,
  setSolvedQuestions,
  questionId,
}) => {
  const answerHandle = (value) => {
    setSolvedQuestions((prevQuestions) => [...prevQuestions, questionId]);
    if (value) {
      setResult((prev) => ({
        ...prev,
        score: prev.score + point,
      }));
    } else {
      setResult((prev) => ({
        ...prev,
        score: prev.score === 0 ? 0 : prev.score - point,
      }));
    }
  };
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  // label="True"
                  defaultValue={options[0]?.description}
                  id="true"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={true}
                  control={
                    <Radio onChange={() => answerHandle(options[0]?.isTrue)} />
                  }
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  // label="False"
                  defaultValue={options[1]?.description}
                  id="false"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={false}
                  control={
                    <Radio onChange={() => answerHandle(options[1]?.isTrue)} />
                  }
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default TrueOrFalseOptions;
