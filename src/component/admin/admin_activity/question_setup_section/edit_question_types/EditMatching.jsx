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

const EditMatching = ({
  options,
  optionsTwo,
  choiceHandle,
  choiceTwoHandle,
  answerHandle,
  answers,
}) => {
  return (
    <>
      <Box mt={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="A"
                    id="choice-first"
                    variant="outlined"
                    defaultValue={options[0]?.description}
                    onChange={(e) => choiceHandle("first", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="B"
                    id="choice-second"
                    variant="outlined"
                    defaultValue={options[1]?.description}
                    onChange={(e) => choiceHandle("second", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="C"
                    id="choice-third"
                    variant="outlined"
                    defaultValue={options[2]?.description}
                    onChange={(e) => choiceHandle("third", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="D"
                    id="choice-fourth"
                    variant="outlined"
                    defaultValue={options[3]?.description}
                    onChange={(e) => choiceHandle("fourth", e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={6} spacing={2}>
                <Grid item xs={12} sx={{ mt: { xs: 1, md: 0 } }}>
                  <TextField
                    fullWidth
                    label="I"
                    id="choiceTwo-first"
                    variant="outlined"
                    defaultValue={optionsTwo[0]?.description}
                    onChange={(e) => choiceTwoHandle("first", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="II"
                    id="choiceTwo-second"
                    variant="outlined"
                    defaultValue={optionsTwo[1]?.description}
                    onChange={(e) => choiceTwoHandle("second", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="III"
                    id="choiceTwo-third"
                    variant="outlined"
                    defaultValue={optionsTwo[2]?.description}
                    onChange={(e) => choiceTwoHandle("third", e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="IV"
                    id="choiceTwo-fourth"
                    variant="outlined"
                    defaultValue={optionsTwo[3]?.description}
                    onChange={(e) => choiceTwoHandle("fourth", e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Box>
      <Box mt={2}>
        <FormControl fullWidth>
          <RadioGroup aria-labelledby="group-label" name="radio-group">
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="option-a-label">Option A</InputLabel>
                  <Select
                    labelId="option-a-label"
                    id="option-a-select"
                    label="Option A"
                    value={answers?.first || ""}
                    onChange={(e) => answerHandle("first", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="option-b-label">Option B</InputLabel>
                  <Select
                    labelId="option-b-label"
                    id="option-b-select"
                    label="Option B"
                    value={answers?.second || ""}
                    onChange={(e) => answerHandle("second", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="option-c-label">Option C</InputLabel>
                  <Select
                    labelId="option-c-label"
                    id="option-c-select"
                    label="Option C"
                    value={answers?.third || ""}
                    onChange={(e) => answerHandle("third", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="option-d-label">Option D</InputLabel>
                  <Select
                    labelId="option-d-label"
                    id="option-d-select"
                    label="Option D"
                    value={answers?.fourth || ""}
                    onChange={(e) => answerHandle("fourth", e.target.value)}
                  >
                    {option?.map((item) => (
                      <MenuItem key={item?.id} value={item?.value}>
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
export default EditMatching;