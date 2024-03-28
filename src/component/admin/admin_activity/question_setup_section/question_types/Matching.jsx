import React from "react";
import {
  Box,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  RadioGroup,
} from "@mui/material";
import { option } from "../../../../../data/Static";

const Matching = ({ choiceHandle, choiceTwoHandle, answerHandle }) => {
  return (
    <>
      <Box p={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="A"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("option1", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="I"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceTwoHandle("option1", e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="B"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("option2", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="II"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceTwoHandle("option2", e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="C"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("option3", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="III"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceTwoHandle("option3", e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="D"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceHandle("option4", e.target.value)}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="IV"
                  id="your-text"
                  variant="outlined"
                  onChange={(e) => choiceTwoHandle("option4", e.target.value)}
                  size="small"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
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
                    onChange={(e) => answerHandle("A", e.target.value)}
                  >
                    {option?.map((item) => (
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
                    onChange={(e) => answerHandle("B", e.target.value)}
                  >
                    {option?.map((item) => (
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
                  <InputLabel id="question-type-label">Option C</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) => answerHandle("C", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="question-type-label">Option D</InputLabel>
                  <Select
                    labelId="question-type-label"
                    id="question-type-select"
                    label="Question Type"
                    onChange={(e) => answerHandle("D", e.target.value)}
                  >
                    {option?.map((item) => (
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
