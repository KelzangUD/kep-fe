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
  setSolvedQuestions,
  questionId,
  testId,
  userId,
  solvedQuestions,
}) => {
  const answerHandle = (value, optionId) => {
    setSolvedQuestions((prevQuestions) => {
      const index = prevQuestions.findIndex((q) => q.questionId === questionId);
      const updatedEntry = {
        questionType: "T/F",
        questionId,
        optionOne: optionId,
        optionTwo: null,
        userId,
        testId,
        answer: "",
        match: [],
      };
      if (index !== -1) {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = updatedEntry;
        return updatedQuestions;
      } else {
        return [...prevQuestions, updatedEntry];
      }
    });
  };
  return (
    <>
      <Box mb={4}>
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="group-label"
            name="radio-group"
            defaultValue={
              solvedQuestions?.find((item) => item?.questionId === questionId)
                ?.optionOne || ""
            }
          >
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  defaultValue={options[0]?.description}
                  id="true"
                  variant="outlined"
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={1}>
                <FormControlLabel
                  value={options[0]?.id}
                  control={
                    <Radio
                      onChange={() =>
                        answerHandle(options[0]?.isTrue, options[0]?.id)
                      }
                    />
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
                  value={options[1]?.id}
                  control={
                    <Radio
                      onChange={() =>
                        answerHandle(options[1]?.isTrue, options[1]?.id)
                      }
                    />
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
