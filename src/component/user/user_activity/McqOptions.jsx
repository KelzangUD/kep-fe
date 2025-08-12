import {
  Box,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const McqOptions = ({
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
        questionType: "MCQ",
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
              <Grid item xs={10} md={5}>
                <TextField
                  fullWidth
                  label="Option 1"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[0]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={2} md={1}>
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
              <Grid item xs={10} md={5}>
                <TextField
                  fullWidth
                  label="Option 2"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[1]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={2} md={1}>
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
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={10} md={5}>
                <TextField
                  fullWidth
                  label="Option 3"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[2]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <FormControlLabel
                  value={options[2]?.id}
                  control={
                    <Radio
                      onChange={() =>
                        answerHandle(options[2]?.isTrue, options[2]?.id)
                      }
                    />
                  }
                />
              </Grid>
              <Grid item xs={10} md={5}>
                <TextField
                  fullWidth
                  label="Option 4"
                  id="your-text"
                  variant="outlined"
                  defaultValue={options[3]?.description}
                  disabled
                  size="small"
                />
              </Grid>
              <Grid item xs={2} md={1}>
                <FormControlLabel
                  value={options[3]?.id}
                  control={
                    <Radio
                      onChange={() =>
                        answerHandle(options[3]?.isTrue, options[3]?.id)
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

export default McqOptions;
