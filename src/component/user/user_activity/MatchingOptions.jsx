import {
  Box,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  RadioGroup,
  Typography,
} from "@mui/material";

const MatchingOptions = ({
  options,
  optionsTwo,
  point,
  setSolvedQuestions,
  questionId,
  testId,
  userId,
  solvedQuestions,
}) => {
  const answerHandle = (option, value) => {
    setSolvedQuestions((prevQuestions) => {
      const index = prevQuestions.findIndex((q) => q.questionId === questionId);
      if (index !== -1) {
        // Clone previous questions
        const updatedQuestions = [...prevQuestions];

        // Clone the match array
        const updatedMatch = [...updatedQuestions[index].match];

        // Find match entry with same optionTwo id
        const matchIndex = updatedMatch.findIndex(
          (m) => m.optionOne === option
        );

        if (matchIndex !== -1) {
          // Update existing match entry
          updatedMatch[matchIndex] = {
            optionOne: option,
            optionTwo: JSON.parse(value)?.id,
          };
        } else {
          // Add new match entry
          updatedMatch.push({
            optionOne: option,
            optionTwo: JSON.parse(value)?.id,
          });
        }

        // Update the main entry
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          match: updatedMatch,
        };

        return updatedQuestions;
      } else {
        // If no existing question, create new entry
        return [
          ...prevQuestions,
          {
            questionType: "Match",
            questionId,
            optionOne: null,
            optionTwo: null,
            userId,
            testId,
            answer: "",
            match: [
              {
                optionOne: option,
                optionTwo: JSON.parse(value)?.id,
              },
            ],
          },
        ];
      }
    });
  };
  return (
    <>
      <Box py={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={2}>
              <Grid item container spacing={2} xs={12} md={6}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    A. {options[0]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    B. {options[1]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    C. {options[2]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    D. {options[3]?.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    I. {optionsTwo[0]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    II. {optionsTwo[1]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    III. {optionsTwo[2]?.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    IV. {optionsTwo[3]?.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mb={4}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) => {
                      answerHandle(options[0]?.id, e?.target?.value);
                    }}
                    defaultValue={(() => {
                      const matchedOptionTwo = solvedQuestions
                        ?.find((item) =>
                          item?.match?.some(
                            (element) => element?.optionOne === options[0]?.id
                          )
                        )
                        ?.match?.find(
                          (element) => element?.optionOne === options[0]?.id
                        )?.optionTwo;

                      return matchedOptionTwo
                        ? JSON.stringify({
                            optionOne: options[0]?.id,
                            id: matchedOptionTwo,
                          })
                        : "";
                    })()}
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem
                        key={item?.id}
                        value={JSON.stringify({
                          optionOne: item?.optionOne,
                          id: item?.id,
                        })}
                      >
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[1]?.id, e.target.value)
                    }
                    defaultValue={(() => {
                      const matchedOptionTwo = solvedQuestions
                        ?.find((item) =>
                          item?.match?.some(
                            (element) => element?.optionOne === options[1]?.id
                          )
                        )
                        ?.match?.find(
                          (element) => element?.optionOne === options[1]?.id
                        )?.optionTwo;

                      return matchedOptionTwo
                        ? JSON.stringify({
                            optionOne: options[1]?.id,
                            id: matchedOptionTwo,
                          })
                        : "";
                    })()}
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem
                        key={item?.id}
                        value={JSON.stringify({
                          optionOne: item?.optionOne,
                          id: item?.id,
                        })}
                      >
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="question-type-label">Option C</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[2]?.id, e.target.value)
                    }
                    defaultValue={(() => {
                      const matchedOptionTwo = solvedQuestions
                        ?.find((item) =>
                          item?.match?.some(
                            (element) => element?.optionOne === options[2]?.id
                          )
                        )
                        ?.match?.find(
                          (element) => element?.optionOne === options[2]?.id
                        )?.optionTwo;

                      return matchedOptionTwo
                        ? JSON.stringify({
                            optionOne: options[2]?.id,
                            id: matchedOptionTwo,
                          })
                        : "";
                    })()}
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem
                        key={item?.id}
                        value={JSON.stringify({
                          optionOne: item?.optionOne,
                          id: item?.id,
                        })}
                      >
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="question-type-label">Option D</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) =>
                      answerHandle(options[3]?.id, e.target.value)
                    }
                    defaultValue={(() => {
                      const matchedOptionTwo = solvedQuestions
                        ?.find((item) =>
                          item?.match?.some(
                            (element) => element?.optionOne === options[3]?.id
                          )
                        )
                        ?.match?.find(
                          (element) => element?.optionOne === options[3]?.id
                        )?.optionTwo;

                      return matchedOptionTwo
                        ? JSON.stringify({
                            optionOne: options[3]?.id,
                            id: matchedOptionTwo,
                          })
                        : "";
                    })()}
                  >
                    {optionsTwo?.map((item) => (
                      <MenuItem
                        key={item?.id}
                        value={JSON.stringify({
                          optionOne: item?.optionOne,
                          id: item?.id,
                        })}
                      >
                        {item?.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
    </>
  );
};

export default MatchingOptions;
