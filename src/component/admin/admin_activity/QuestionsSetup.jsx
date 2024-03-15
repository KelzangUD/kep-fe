import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import Transition from "../../../common/Transition";
// import SlideSection from "./question_setup_section/SlideSection";
import MainSlide from "./question_setup_section/MainSlide";
import Route from "../../../routes/Route";

const QuestionsSetup = ({ setQuestionsSetUp }) => {
  // init states
  const [questionTypes, setQuestionTypes] = useState([]);
  const [cancel, setCancel] = useState(false);
  const [questions, setQuestions] = useState([]);

  const addQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const token = localStorage.getItem("token");
  const fetchQuestionTypes = async () => {
    const res = await Route("GET", "/question-types", token, null);
    if (res?.status === 200) {
      setQuestionTypes(res?.data?.questionTypes);
    }
  };
  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Add Questions | Questions Setup" />
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" sx={{ mr: 2 }} endIcon={<SaveIcon />}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                endIcon={<CancelIcon />}
                onClick={() => setCancel(true)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            {/* <Grid item xs={3}>
              <SlideSection setQuestions={setQuestions} addQuestion={addQuestion} questions={questions} />
            </Grid> */}
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item xs={12} sx={{ px: 2, height: "100%" }}>
              {questions?.map((item, index) => (
                <MainSlide
                  key={index}
                  index={index}
                  setQuestions={setQuestions}
                  questionTypes={questionTypes}
                  addQuestion={addQuestion}
                  questions={questions}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 2, minWidth: "100%" }}>
        <Button
          aria-label="add slide"
          size="small"
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
          onClick={addQuestion}
        >
          Add Slide
        </Button>
      </Box>
      {cancel ? (
        <Dialog
          open={cancel}
          onClose={() => setCancel(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to cancel? All the questions set up will be
              lost.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setQuestionsSetUp(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setCancel(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </>
  );
};

export default QuestionsSetup;
