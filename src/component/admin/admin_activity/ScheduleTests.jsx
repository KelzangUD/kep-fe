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
import QuizIcon from "@mui/icons-material/Quiz";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ScheduleTest from "./schedule_test/ScheduleTest";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditScheduleTest from "./schedule_test/EditScheduleTest";
import Transition from "../../../common/Transition";

const rows = [
  {
    id: 1,
    sl: 1,
    name: "Dec Test-I",
    start_date: "11/12/2023",
    start_time: "10 AM",
    end_date: "20/12/2023",
    end_time: "4:30 PM",
    duration: 2,
    durationType: "1 Hour",
    status: "Active",
    message: "This test is based on Video Title: ISP.",
    questions: [
      {
        question: "JAVA programming language was developed by:"
      },
      {
        question: "A mistake in an algorithm that generates incorrect results or output is called:"
      }
    ]
  },
];

const ScheduleTests = () => {
  const [scheduleTest, setScheduleTest] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [details, setDetails] = React.useState({});
  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  const [id, setId] = React.useState("");
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteQuestion(true);
  };
  const userColumns = [
    { field: "sl", headerName: "Sl. No", width: 40 },
    { field: "name", headerName: "Test Name", width: 250 },
    { field: "start_date", headerName: "Start Date", width: 100 },
    { field: "start_time", headerName: "Start Time", width: 100 },
    { field: "end_date", headerName: "End Date", width: 100 },
    { field: "end_time", headerName: "End Time", width: 100 },
    { field: "durationType", headerName: "Duration", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 140,
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
  const scheduleTestHandle = () => {
    setScheduleTest(true);
  };
  return (
    <>
      {scheduleTest ? (
        <ScheduleTest setScheduleTest={setScheduleTest} />
      ) : edit ? (
        <EditScheduleTest details={details} open={edit} setOpen={setEdit} />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Scheduled Tests" />
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  endIcon={<QuizIcon />}
                  sx={{ mr: 2 }}
                  onClick={scheduleTestHandle}
                >
                  Schedule Test
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
      )}
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

export default ScheduleTests;
