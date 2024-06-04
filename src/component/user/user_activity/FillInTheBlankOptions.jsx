import React from "react";
import { Box, Grid, TextField, FormControl, RadioGroup } from "@mui/material";

const FillInTheBlankOptions = ({
  options,
  point,
  setResult,
  setSolvedQuestions,
  questionId,
}) => {
  const answerHandle = (e) => {
    setSolvedQuestions((prevQuestions) => {
      if (!prevQuestions.includes(questionId)) {
        return [...prevQuestions, questionId];
      } else {
        return prevQuestions;
      }
    });
    if (
      e.target.value?.toLowerCase().trim() ===
      options[0]?.description.toLowerCase().trim()
    ) {
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add Answer"
                  id="your-text"
                  variant="outlined"
                  size="small"
                  onChange={answerHandle}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default FillInTheBlankOptions;
