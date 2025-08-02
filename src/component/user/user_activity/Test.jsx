import React, { useState, useEffect } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import SubHeader from "../../../common/SubHeader";
import Notification from "../../../ui/Notification";
import RenderStatus from "../../../ui/RenderStatus";
import CustomToolbar from "../../../ui/CustomToolBar";
import Route from "../../../routes/Route";
import TakeTest from "./TakeTest";
import { useCommon } from "../../../contexts/CommonContext";
import { shuffleArray } from "../../../util/CommonUtil";

const Test = () => {
  const { isMdUp } = useCommon();
  const [tests, setTests] = useState([]);
  const [id, setId] = useState(null);
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [takeTest, setTakeTest] = useState(false);
  const [details, setDetails] = useState({});
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");
  const fetchTests = async () => {
    const res = await Route("GET", "/tests", token, null, null);
    if (res?.status === 200) {
      setTests(res?.data?.tests);
    }
  };
  useEffect(() => {
    fetchTests();
  }, []);
  const fetchQuestions = async (id, row) => {
    const res = await Route("GET", "/tests", token, null, id);
    if (res?.status === 200) {
      if (res?.data?.message == "You have Already Appeared for Test") {
        setMessage(res?.data?.message);
        setShowNotification(true);
      } else {
        setQuestions(shuffleArray(res?.data?.questions));
        setDetails(row);
        setTakeTest(true);
      }
    } else {
      setMessage(res?.data?.message);
      setShowNotification(true);
    }
  };
  const testHandle = (param) => {
    if (param?.row?.start_date > new Date().toJSON()) {
      setMessage(
        "You can't take the test at this time because test is not opened."
      );
      setShowNotification(true);
    }else if (param?.row?.end_date <= new Date().toJSON()) {
      setMessage(
        "You're unable to take the test as it is closed."
      );
      setShowNotification(true);
    } else {
      fetchQuestions(param?.row?.id, param?.row);
    }
  };

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
      width: isMdUp ? undefined : 140,
      valueGetter: (params) => params.row.end_date.split("T")[0],
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
    },
    {
      field: "status",
      headerName: "Status",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
      renderCell: (params) => (
        <RenderStatus
          status={params.row.status === true ? "Active" : "Inactive"}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: isMdUp ? 100 : undefined,
      width: isMdUp ? undefined : 140,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={() => testHandle(params)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <>
      {takeTest ? (
        <TakeTest
          details={details}
          setTakeTest={setTakeTest}
          questions={questions}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
            <SubHeader text="Test" />
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

      {showNotification ? (
        <Notification
          open={showNotification}
          setOpen={setShowNotification}
          message={message}
        />
      ) : null}
    </>
  );
};

export default Test;
