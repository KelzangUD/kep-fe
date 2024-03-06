import React from "react";
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  FormControlLabel,
  Radio,
  Select,
  RadioGroup,
  Button,
} from "@mui/material";

const Matching = () => {
  const optionA = [
    {
      id: 1,
      title: "A",
    },
    {
      id: 2,
      title: "B",
    },
    {
      id: 3,
      title: "C",
    },
    {
      id: 4,
      title: "D",
    },
  ];
  const optionB = [
    {
      id: 1,
      title: "I",
    },
    {
      id: 2,
      title: "II",
    },
    {
      id: 3,
      title: "III",
    },
    {
      id: 4,
      title: "IV",
    },
  ];
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionA?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionB?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionA?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionB?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionA?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionB?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option A</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionA?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option B</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    // onChange={questionTypeHandle}
                  >
                    {optionB?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
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

export default Matching;
