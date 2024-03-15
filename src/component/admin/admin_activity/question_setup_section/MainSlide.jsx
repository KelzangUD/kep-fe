import React, { useState } from "react";
import {
  Box,
  InputLabel,
  Card,
  Divider,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Transition from "../../../../common/Transition";
import DeleteIcon from "@mui/icons-material/Delete";
import Mcq from "./question_types/Mcq";
import FillInTheBank from "./question_types/FillInTheBank";
import TrueOrFalse from "./question_types/TrueOrFalse";
import YesOrNo from "./question_types/YesOrNo";
import Matching from "./question_types/Matching";
import { attachment } from "../../../../data/Static";
import Route from "../../../../routes/Route";

const MainSlide = ({
  index,
  questionTypes,
  setQuestions,
  addQuestion,
  questions,
}) => {
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
  const [attachFile, setAttachFile] = useState(1);
  const [attachmentType, setAttachmentType] = useState("None");
  const [media, setMedia] = useState([]);
  React.useEffect(() => {
    console.log(questions);
  }, []);

  const [deleteSilde, setDeleteSlide] = useState(false);
  const removeQuestion = () => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
    setDeleteSlide(false);
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
  const token = localStorage.getItem("token");
  const fetchVideos = async () => {
    const res = await Route("GET", "/videos", token, null);
    if (res?.status === 200) {
      setMedia(res?.data?.videos);
    }
  };
  const fetchAudios = async () => {
    const res = await Route("GET", "/audios", token, null);
    if (res?.status === 200) {
      setMedia(res?.data?.audios);
    }
  };
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
      point: parseInt(e.target.value),
    }));
  };
  const questionHandle = (e) => {
    setData((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };
  const attachmentHandle = (value) => {
    const [id, name] = value.split(",");
    if (!isNaN(parseInt(id))) {
      if (parseInt(id) === 2) {
        fetchVideos();
      } else if (parseInt(id) === 3) {
        fetchAudios();
      }
    }
    setAttachmentType(name);
    setAttachFile(parseInt(id));
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
          <FormControl sx={{ minWidth: 200 }}>
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
        <Box p={2} sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="attachment-label">Attachment</InputLabel>
            <Select
              labelId="attachment-label"
              id="attachment-select"
              label="Attachment"
              onChange={(e) => attachmentHandle(e.target.value)}
            >
              {attachment?.map((item) => (
                <MenuItem key={item?.id} value={`${item.id},${item.name}`}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {attachFile === 2 || attachFile === 3 ? (
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id={`${attachmentType}-label`}>
                {attachmentType}
              </InputLabel>
              <Select
                labelId={`${attachmentType}-label`}
                id={`${attachmentType}-select`}
                label={attachmentType}
                // onChange={questionTypeHandle}
              >
                {media?.map((item) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </Box>
        {renderQuestionType()}
        <Box p={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            aria-label="delete"
            size="small"
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            onClick={() => setDeleteSlide(true)}
          >
            Delete
          </Button>
        </Box>
      </Card>
      {deleteSilde ? (
        <Dialog
          open={deleteSilde}
          onClose={() => setDeleteSlide(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this slide?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => removeQuestion()}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteSlide(false)}
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

export default MainSlide;
