import React from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import { DataGrid } from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditUser from "../admin_system_setting/EditUser";
import Transition from "../../../common/Transition";
import QuestionsSetup from "./QuestionsSetup";

const rows = [
  {
    id: 1,
    sl: 1,
    question: "Computer program consists of:",
    point: 5,
    type: "MCQ",
    option: [
      {
        option: "Instructions and Data",
      },
      {
        option: "Low level language",
      },
      {
        option: "Instruction data & low level language",
      },
      {
        option: "Data",
      },
    ],
    answer: "Instruction data & low level language",
  },
  {
    id: 2,
    sl: 2,
    question: "TICPL is ISP Company.",
    point: 5,
    type: "True/False",
    option: [
      {
        option: true,
      },
      {
        option: false,
      },
    ],
    answer: true,
  },
  {
    id: 3,
    sl: 3,
    question: "Tashi InfoComm Private Limited is the first private cellular company in Bhutan, a separate entity under Tashi Group of Companies. ",
    point: 5,
    type: "Yes/No",
    option: [
      {
        option: "Yes",
      },
      {
        option: "No",
      },
    ],
    answer: true,
  },
];

const AddQuestions = () => {
  const [questionsSetUp, setQuestionsSetUp] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  const [id, setId] = React.useState("");
  const editHandle = (param) => {
    setUserDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteQuestion(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "question", headerName: "Question", width: 530 },
    { field: "point", headerName: "Point", width: 60 },
    { field: "type", headerName: "Question Type", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteHandle(params)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  const questionSetUpHandle = () => {
    setQuestionsSetUp(true);
  };
  return (
    <>
    {
      questionsSetUp ? <QuestionsSetup setQuestionsSetUp={setQuestionsSetUp} /> : <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
        <SubHeader text="Add Questions" />
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item>
            <Button
              variant="outlined"
              endIcon={<PersonAddIcon />}
              sx={{ mr: 2 }}
              onClick={questionSetUpHandle}
            >
              Add Questions
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </Grid>
        </Grid>
        <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={userColumns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
    }
      {edit ? (
        <EditUser details={userDetails} open={edit} setOpen={setEdit} />
      ) : null}
      {deleteQuestion ? (
        <Dialog
          open={deleteQuestion}
          onClose={() => setDeleteQuestion(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this question?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setDeleteQuestion(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteQuestion(false)}
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

export default AddQuestions;
