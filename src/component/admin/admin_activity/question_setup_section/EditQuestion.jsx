import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import EditMcq from "./edit_question_types/EditMcq";
import EditFillInTheBlank from "./edit_question_types/EditFillInTheBlank";
import EditTrueOrFalse from "./edit_question_types/EditTrueOrFalse";
import EditYesOrNo from "./edit_question_types/EditYesOrNo";
import EditMatching from "./edit_question_types/EditMatching";
import Transition from "../../../../common/Transition";
import Route from "../../../../routes/Route";
import { attachment } from "../../../../data/Static";

const EditQuestion = ({
  id,
  details,
  options,
  optionsTwo,
  open,
  setOpen,
  fetchQuestions,
  setOpenNotification,
  setMessage,
}) => {
  const keyArray = ["first", "second", "third", "fourth"];

  // Options (A/B/C/D) — position based on creation order
  const optionsOnes = options.map((option, index) => ({
    id: option.id,
    position: keyArray[index],
  }));

  // OptionsTwo (I/II/III/IV) — position based on THEIR OWN creation order
  // (sort by id to guarantee correct order regardless of what the backend returns)
  const sortedOptionsTwo = [...optionsTwo].sort((a, b) => a.id - b.id);
  const optionsTwos = sortedOptionsTwo.map((option, index) => ({
    id: option.id,
    description: option.description,
    optionOne: option.optionOne,
    position: keyArray[index],
  }));

  // Text values for the I/II/III/IV fields
  const choice2ByPosition = {};
  optionsTwos.forEach((o) => {
    choice2ByPosition[o.position] = o.description;
  });

  // Matching object: which Option (A/B/C/D) maps to which I/II/III/IV slot
  const matchingOutput = {};
  optionsOnes.forEach((optionOne) => {
    const matchedOption = optionsTwos.find(
      (optionTwo) => optionTwo.optionOne === optionOne.id
    );
    if (matchedOption) {
      matchingOutput[optionOne.position] = matchedOption.position;
    }
  });

  // init states
  const [questionDetails, setQuestionDetails] = useState({
    questionType: details?.question_type,
    point: details?.point,
    question: details?.question,
    choice: [
      {
        first: options[0]?.description,
        second: options[1]?.description,
        third: options[2]?.description,
        fourth: options[3]?.description,
      },
    ],
    choice2:
      optionsTwo?.length > 0
        ? [
            {
              first: choice2ByPosition.first,
              second: choice2ByPosition.second,
              third: choice2ByPosition.third,
              fourth: choice2ByPosition.fourth,
            },
          ]
        : [],
    matching: [matchingOutput],
    video: details?.video,
    audio: details?.audio,
    answer:
      options[0]?.isTrue === true
        ? "first"
        : options[1]?.isTrue === true
        ? "second"
        : options[2]?.isTrue === true
        ? "third"
        : options[3]?.isTrue === true
        ? "fourth"
        : undefined,
  });
  const [questionTypes, setQuestionTypes] = useState([]);
  const [attachFile, setAttachFile] = useState(1);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const token = localStorage.getItem("token");

  const fetchQuestionTypes = async () => {
    const res = await Route("GET", `/question-types`, token, null, null);
    if (res?.status === 200) {
      setQuestionTypes(res?.data?.questionTypes);
    }
  };
  const fetchVideos = async () => {
    const res = await Route("GET", "/videos", token, null, null);
    if (res?.status === 200) {
      setVideos(res?.data?.videos);
    }
  };
  const fetchAudios = async () => {
    const res = await Route("GET", "/audios", token, null, null);
    if (res?.status === 200) {
      setAudios(res?.data?.audios);
    }
  };

  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  const questionTypeHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      questionType: e.target.value,
    }));
  };
  const pointHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      point: parseInt(e.target.value),
    }));
  };
  const questionHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };
  const attachmentHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      video: null,
      audio: null,
    }));
    if (!isNaN(e.target.value)) {
      if (e.target.value === 2) {
        fetchVideos();
      } else if (e.target.value === 3) {
        fetchAudios();
      }
    }
    setAttachFile(e.target.value);
  };
  const videoHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      video: e.target.value,
    }));
  };
  const audioHandle = (e) => {
    setQuestionDetails((prev) => ({
      ...prev,
      audio: e.target.value,
    }));
  };
  const choiceHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      choice: prev.choice.map((existingOptions) => ({
        ...existingOptions,
        [option]: text,
      })),
    }));
  };
  const choiceTwoHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      choice2: prev.choice2.map((existingOptions) => ({
        ...existingOptions,
        [option]: text,
      })),
    }));
  };
  const answerHandle = (option) => {
    setQuestionDetails((prev) => ({
      ...prev,
      answer: option,
    }));
  };
  const matchingAnswerHandle = (option, text) => {
    setQuestionDetails((prev) => ({
      ...prev,
      matching: prev.matching.map((existingOptions) => {
        const updated = { ...existingOptions };
        Object.keys(updated).forEach((key) => {
          if (key !== option && updated[key] === text) {
            updated[key] = "";
          }
        });
        updated[option] = text;
        return updated;
      }),
    }));
  };
  const renderQuestionType = () => {
    switch (questionDetails?.questionType) {
      case 1:
        return (
          <EditMcq
            options={options}
            choiceHandle={choiceHandle}
            answerHandle={answerHandle}
          />
        );
      case 2:
        return (
          <EditFillInTheBlank
            options={options}
            choiceHandle={choiceHandle}
            answerHandle={answerHandle}
          />
        );
      case 3:
        return (
          <EditTrueOrFalse options={options} answerHandle={answerHandle} />
        );
      case 4:
        return <EditYesOrNo options={options} answerHandle={answerHandle} />;
      case 5:
        return (
          <EditMatching
            options={options}
            optionsTwo={optionsTwo}
            choiceHandle={choiceHandle}
            choiceTwoHandle={choiceTwoHandle}
            answerHandle={matchingAnswerHandle}
            answers={questionDetails.matching[0]}
            choiceValues={questionDetails.choice[0]}
            choiceTwoValues={questionDetails.choice2[0]}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {

    const response = await Route(
      "PUT",
      `/questions`,
      token,
      questionDetails,
      id
    );
    if (response?.status === 201) {
      setMessage(response?.data?.message);
      setOpenNotification(true);
      fetchQuestions();
      setOpen(false);
    } else {
      setMessage(response?.response?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Grid item xs={12} md={6}>
              <FormControl
                required
                sx={{ minWidth: { xs: "100%", md: 300 } }}
                size="small"
              >
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  id="question-type-select"
                  label="Question Type"
                  defaultValue={details?.question_type}
                  onChange={questionTypeHandle}
                >
                  {questionTypes?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <FormControl
                sx={{ minWidth: { xs: "100%", md: 200 }, mt: { xs: 2, md: 0 } }}
              >
                <TextField
                  fullWidth
                  label="Point"
                  id="point"
                  required
                  defaultValue={details?.point}
                  onChange={pointHandle}
                  size="small"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={2}>
            <TextField
              fullWidth
              label="Question"
              id="question"
              multiline
              rows={9}
              required
              defaultValue={details?.question}
              onChange={questionHandle}
              size="small"
            />
          </Box>
          <Grid
            mt={2}
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={12} md={6}>
              <FormControl
                sx={{ minWidth: { xs: "100%", md: 300 } }}
                size="small"
              >
                <InputLabel id="attachment-label">Attachment</InputLabel>
                <Select
                  labelId="attachment-label"
                  id="attachment-select"
                  label="Attachment"
                  onChange={attachmentHandle}
                >
                  {attachment?.map((item) => (
                    <MenuItem key={item?.id} value={item?.id}>
                      {item?.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              {attachFile === 2 ? (
                <FormControl
                  sx={{
                    minWidth: { xs: "100%", md: 300 },
                    mt: { xs: 2, md: 0 },
                  }}
                  size="small"
                >
                  <InputLabel id="video-label">Video</InputLabel>
                  <Select
                    labelId="video-label"
                    id="video-select"
                    label="Video"
                    defaultValue={details?.video}
                    onChange={videoHandle}
                  >
                    {videos?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
              {attachFile === 3 ? (
                <FormControl
                  sx={{
                    minWidth: { xs: "100%", md: 300 },
                    mt: { xs: 2, md: 0 },
                  }}
                  size="small"
                >
                  <InputLabel id="audio-label">Audio</InputLabel>
                  <Select
                    labelId="audio-label"
                    id="audio-select"
                    label="Audio"
                    defaultValue={details?.audio}
                    onChange={audioHandle}
                  >
                    {audios?.map((item) => (
                      <MenuItem key={item?.id} value={item?.id}>
                        {item?.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : null}
            </Grid>
          </Grid>
          {renderQuestionType()}
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" onClick={handleSubmit} size="small">
            Update
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="error"
            size="small"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditQuestion;