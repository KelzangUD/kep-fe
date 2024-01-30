import React, { useState } from "react";
import {
  Box,
  InputLabel,
  Card,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
  styled,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const MainSlide = ({ questionTypes }) => {
  // init states
  const [data, setData] = useState({
    questionType: 1,
    question: "",
    point: 1,
    options: {
      1: "",
      2: "",
      3: "",
      4: "",
    },
    answer: null,
  });
  // handlers
  const questionTypeHandle = (e) => {
    setData((prev) => ({
      ...prev,
      questionType: e.target.value,
    }));
  };
  const pointHandle = (e) => {
    setData((prev) => ({
      ...prev,
      point:  parseInt(e.target.value),
    }));
  }; 
  const questionHandle = (e) => {
    setData((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="question-type-label">Question Type</InputLabel>
            <Select
              labelId="question-type-label"
              id="question-type-select"
              label="Question Type"
              defaultValue={1}
              onChange={questionTypeHandle}
            >
              {questionTypes?.map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 300 }}>
            <TextField
              fullWidth
              label="Point"
              id="point"
              multiline
              onChange={pointHandle}
            />
          </FormControl>
        </Box>
        <Box p={2}>
          <TextField
            fullWidth
            label="Question"
            id="question"
            multiline
            rows={3}
            onChange={questionHandle}
          />
        </Box>
        {/* <Box p={2}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
            size="large"
          >
            Upload Attachment
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box> */}
        <Box p={2}>
          <FormControl fullWidth>
            <RadioGroup aria-labelledby="group-label" name="radio-group">
              <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    label="Add Answer 1"
                    id="your-text"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControlLabel value={1} control={<Radio />} />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    label="Add Answer 2"
                    id="your-text"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControlLabel value={2} control={<Radio />} />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    label="Add Answer 3"
                    id="your-text"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControlLabel value={3} control={<Radio />} />
                </Grid>
              </Grid>
              <Grid container spacing={1} alignItems="center" sx={{ py: 1 }}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    label="Add Answer 4"
                    id="your-text"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormControlLabel value={4} control={<Radio />} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Box>
      </Card>
    </>
  );
};

export default MainSlide;
