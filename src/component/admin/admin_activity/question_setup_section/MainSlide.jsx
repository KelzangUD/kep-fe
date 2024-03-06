import React, { useState } from "react";
import {
  Box,
  InputLabel,
  Card,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from "@mui/material";
import Mcq from "./question_types/Mcq";
import FillInTheBank from "./question_types/FillInTheBank";
import TrueOrFalse from "./question_types/TrueOrFalse";
import YesOrNo from "./question_types/YesOrNo";
import Matching from "./question_types/Matching";


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
  const renderQuestionType = () => {
    switch (data?.questionType) {
      case 1:
        return <Mcq />;
      case 2:
        return <FillInTheBank />;
      case 3:
        return <TrueOrFalse />;
      case 4:
        return <YesOrNo />;
      default:
        return <Matching />;
    }
  };
  const pointHandle = (e) => {
    setData((prev) => ({
      ...prev,
      point: parseInt(e.target.value),
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
            rows={9}
            onChange={questionHandle}
          />
        </Box>
        {renderQuestionType()}
      </Card>
    </>
  );
};

export default MainSlide;
