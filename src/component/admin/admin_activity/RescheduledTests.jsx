import React, { useState, useEffect } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditScheduleTest from "./schedule_test/EditScheduleTest";
import Transition from "../../../common/Transition";
import Notification from "../../../ui/Notification";
import RenderStatus from "../../../ui/RenderStatus";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import { useCommon } from "../../../contexts/CommonContext";

const ReScheduledTests = () => {
  const { isMdUp } = useCommon();
  const [tests, setTests] = useState([]);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});
  const [deleteTest, setDeleteTest] = useState(false);
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  // handlers
  const editHandle = (param) => {
    setDetails(param?.row);
    setEdit(true);
  };
  const deleteHandle = (param) => {
    setId(param?.id);
    setDeleteTest(true);
  };
  const token = localStorage.getItem("token");
  const fetchTest = async () => {
    const res = await Route("GET", "/retests", token, null, null);
    if (res?.status === 200) {
      setTests(res?.data?.tests);
    }
  };
  useEffect(() => {
    fetchTest();
  }, []);
  const userColumns = [
    {
      field: "sl",
      headerName: "Sl. No",
      flex: isMdUp ? 40 : undefined,
      width: isMdUp ? undefined : 40,
    },
    {
      field: "name",
      headerName: "Test Name",
      flex: isMdUp ? 200 : undefined,
      width: isMdUp ? undefined : 200,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
      valueGetter: (params) => params.row.start_date.split("T")[0],
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 130,
      valueGetter: (params) => params.row.end_date.split("T")[0],
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: isMdUp ? 90 : undefined,
      width: isMdUp ? undefined : 130,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: isMdUp ? 90 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 150,
      renderCell: (params) => (
        <RenderStatus
          status={params?.row?.status === true ? "Active" : "Inactive"}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 140 : undefined,
      width: isMdUp ? undefined : 110,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => editHandle(params)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteHandle(params)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const deleteTestHandler = async () => {
    const res = await Route("DELETE", `/retests`, token, null, id);
    if (res?.status === 201) {
      setDeleteTest(false);
      setMessage(res?.data?.message);
      fetchTest();
      setOpenNotification(true);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      {edit ? (
        <EditScheduleTest
          testDetails={details}
          setOpen={setEdit}
          setMessage={setMessage}
          setOpenNotification={setOpenNotification}
          fetchTest={fetchTest}
          route="retests"
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Re-Scheduled Tests" />
            <Grid item container alignItems="center" xs={12}>
              <div style={{ height: "auto", width: "100%" }}>
                <DataGrid
                  rows={tests?.map((row, index) => ({
                    ...row,
                    sl: index + 1,
                  }))}
                  columns={userColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  slots={{ toolbar: CustomToolbar }}
                />
              </div>
            </Grid>
          </Grid>
        </Box>
      )}
      {deleteTest ? (
        <Dialog
          open={deleteTest}
          onClose={() => setDeleteTest(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to delete this test?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={deleteTestHandler}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setDeleteTest(false)}
              variant="outlined"
              color="error"
              size="small"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
    </>
  );
};

export default ReScheduledTests;
