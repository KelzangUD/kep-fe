import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SubHeader from "../../../../common/SubHeader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Route from "../../../../routes/Route";
import dayjs from "dayjs";
import { customISOString } from "../../../../util/CommonUtil";

const EditScheduleTest = ({
  testDetails,
  setOpen,
  setMessage,
  setOpenNotification,
  fetchTest,
  route = "tests",
}) => {
  const [details, setDetails] = useState({
    testName: testDetails?.name,
    startDate: testDetails?.start_date,
    endDate: testDetails?.end_date,
    duration: testDetails?.duration,
    startTime:
      new Date().toISOString().split("T")[0] +
      "T" +
      testDetails?.start_time +
      ".000Z",
    endTime:
      new Date().toISOString().split("T")[0] +
      "T" +
      testDetails?.end_time +
      ".000Z",
    message: testDetails?.message,
    status: testDetails?.status,
    // questions: [],
  });
  const token = localStorage.getItem("token");
  const testNameHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      testName: e.target.value,
    }));
  };
  const startDateHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      startDate: customISOString(new Date(e?.$d)),
    }));
  };
  const endDateHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      endDate: customISOString(new Date(e?.$d)),
    }));
  };
  const durationHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      duration: e.target.value,
    }));
  };
  const startTimeHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      startTime: customISOString(new Date(e?.$d)),
    }));
  };
  const endTimeHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      endTime: customISOString(new Date(e?.$d)),
    }));
  };
  const messageHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };
  const statusHandler = (e) => {
    setDetails((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  };
  const editScheduleHandle = async () => {
    const res = await Route(
      "PUT",
      `/${route}`,
      token,
      details,
      testDetails?.id
    );
    if (res?.status === 201) {
      fetchTest();
      setOpen(false);
      setMessage(res?.data?.message);
      setOpenNotification(true);
    } else {
      setMessage(res?.response?.data?.message);
      setOpenNotification(true);
    }
  };
  return (
    <>
      <>
        <Grid container spacing={2} sx={{ px: 2 }}>
          <SubHeader text="Scheduled Tests | Schedule Test" />
          <Grid
            container
            sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}
          >
            <Button
              variant="contained"
              endIcon={<SaveIcon />}
              onClick={editScheduleHandle}
              sx={{ mr: 2 }}
            >
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<HighlightOffIcon />}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item container alignItems="center" xs={12}>
            <Card variant="outlined" sx={{ width: "100%", px: 2, mb: 2 }}>
              <Grid item xs={12} my={2}>
                <Typography as="h6">Schedule Test</Typography>
              </Grid>
              <Grid item container xs={12} alignItems="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    id="outlined-basic"
                    label="Test Name"
                    variant="outlined"
                    fullWidth
                    defaultValue={testDetails?.name}
                    onChange={testNameHandler}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Start Date"
                      sx={{ width: "100%" }}
                      defaultValue={
                        testDetails ? dayjs(testDetails.start_date) : null
                      }
                      onChange={startDateHandler}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="End Date"
                      sx={{ width: "100%" }}
                      defaultValue={
                        testDetails ? dayjs(testDetails.end_date) : null
                      }
                      onChange={endDateHandler}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                spacing={2}
                my={0.2}
              >
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="duration-select-label">Duration</InputLabel>
                    <Select
                      labelId="duration-select-label"
                      id="duration-select-small"
                      label="Duration"
                      defaultValue={testDetails?.duration}
                      onChange={durationHandler}
                    >
                      <MenuItem value="30 mins">30 mins</MenuItem>
                      <MenuItem value="1 Hr">1 Hour</MenuItem>
                      <MenuItem value="2 Hrs">2 Hours</MenuItem>
                      <MenuItem value="3 Hrs">3 Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="Start Time"
                      sx={{ width: "100%" }}
                      defaultValue={
                        testDetails
                          ? dayjs(`2022-01-01T${testDetails.start_time}`)
                          : null
                      }
                      onChange={startTimeHandler}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="End Time"
                      sx={{ width: "100%" }}
                      defaultValue={
                        testDetails
                          ? dayjs(`2022-01-01T${testDetails.end_time}`)
                          : null
                      }
                      onChange={endTimeHandler}
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="duration-select-label">Status</InputLabel>
                    <Select
                      labelId="duration-select-label"
                      id="duration-select-small"
                      label="Duration"
                      defaultValue={testDetails?.status}
                      onChange={statusHandler}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} mb={3}>
                  <TextField
                    id="outlined-basic"
                    label="Message"
                    multiline
                    defaultValue={testDetails?.message}
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={messageHandler}
                    required
                    size="small"
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default EditScheduleTest;
