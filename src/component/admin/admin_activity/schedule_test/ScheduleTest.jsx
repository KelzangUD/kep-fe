import React from "react";
import {
  Box,
  Card,
  Divider,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import SubHeader from "../../../../common/SubHeader";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ScheduleTest = ({ setScheduleTest }) => {
  const scheduleHandle = () => {
    setScheduleTest(false);
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
              onClick={scheduleHandle}
              sx={{ mr: 2 }}
            >
              Schedule
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<HighlightOffIcon />}
              onClick={() => setScheduleTest(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <Card variant="outlined" sx={{ width: 1100 }}>
              <Grid item xs={12} sx={{ p: 2 }}>
                <Typography as="h6">Schedule Test Form</Typography>
              </Grid>
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                spacing={2}
                sx={{ px: 2 }}
              >
                <Grid item xs={3} sx={{ mt: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Test Name"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["startDatePicker"]}>
                      <DatePicker label="Start Date" fullWidth />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["endDatePicker"]}>
                      <DatePicker label="End Date" fullWidth />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="duration-select-label">Duration</InputLabel>
                    <Select
                      labelId="duration-select-label"
                      id="duration-select-small"
                      // value={age}
                      label="Duration"
                      // onChange={handleChange}
                    >
                      <MenuItem value={1}>30 mins</MenuItem>
                      <MenuItem value={2}>1 Hour</MenuItem>
                      <MenuItem value={3}>2 Hours</MenuItem>
                      <MenuItem value={3}>3 Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={12}
                alignItems="center"
                spacing={2}
                sx={{ p: 2 }}
              >
                <Grid item xs={6} sx={{ px: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["startTimePicker"]}>
                      <DemoItem label="Start Time">
                        <StaticTimePicker
                        // defaultValue={dayjs("2022-04-17T15:30")}
                        orientation="landscape"
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6} sx={{ px: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["endTimePicker"]}>
                      <DemoItem label="End Time">
                        <StaticTimePicker
                        // defaultValue={dayjs("2022-04-17T15:30")}
                        orientation="landscape"
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Message"
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Select All Questions"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="1. JAVA programming language was developed by:"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="2. A mistake in an algorithm that generates incorrect results or output is called:"
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </>
    </>
  );
};

export default ScheduleTest;
