import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  // FormControlLabel,
  // Radio,
  RadioGroup,
} from "@mui/material";

const FillInTheBlankOptions = ({
  // options,
  // point,
  // setResult,
  setSolvedQuestions,
  questionId,
  testId,
  userId,
  solvedQuestions,
}) => {
  // const [answer, setAnswer] = useState("");
  const fillInTheBlankHandle = (e) => {
    // setSolvedQuestions((prevQuestions) =>
    //   prevQuestions?.filter((item) => item?.questionId !== questionId)
    // );
    // setAnswer(e?.target?.value);
    setSolvedQuestions((prevQuestions) => {
      const index = prevQuestions.findIndex((q) => q.questionId === questionId);
      const updatedEntry = {
        questionType: "Fill In The Blanks",
        questionId,
        optionOne: null,
        optionTwo: null,
        userId,
        testId,
        answer: e?.target?.value?.toLowerCase().trim(),
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
  // const answerHandle = (value, optionId) => {
  //   setSolvedQuestions((prevQuestions) => {
  //     const index = prevQuestions.findIndex((q) => q.questionId === questionId);
  //     const updatedEntry = {
  //       questionId,
  //       optionOne: optionId,
  //       optionTwo: null,
  //       userId,
  //       testId,
  //       answer: answer?.toLowerCase().trim(),
  //     };
  //     if (index !== -1) {
  //       const updatedQuestions = [...prevQuestions];
  //       updatedQuestions[index] = updatedEntry;
  //       return updatedQuestions;
  //     } else {
  //       return [...prevQuestions, updatedEntry];
  //     }
  //   });
  //   if (
  //     answer?.toLowerCase().trim() ===
  //     options[0]?.description.toLowerCase().trim()
  //   ) {
  //     setResult((prev) => ({
  //       ...prev,
  //       score: prev.score + point,
  //     }));
  //   } else {
  //     setResult((prev) => ({
  //       ...prev,
  //       score: prev.score - point,
  //     }));
  //   }
  // };
  return (
    <>
      <Box mb={4}>
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
                  onChange={fillInTheBlankHandle}
                  onPaste={(e) => {
                    e.preventDefault();
                  }}
                  defaultValue={
                    solvedQuestions?.find(
                      (item) => item?.questionId === questionId
                    )?.answer || ""
                  }
                />
              </Grid>
              {/* <Grid item xs={1}>
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
              </Grid> */}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default FillInTheBlankOptions;
