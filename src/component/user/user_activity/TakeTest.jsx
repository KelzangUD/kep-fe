import { useState, useEffect, useRef } from "react";
import { Alert, Box, Button, ButtonGroup, Grid, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublishIcon from "@mui/icons-material/Publish";
import SubHeader from "../../../common/SubHeader";
import Notification from "../../../ui/Notification";
import Counter from "../../../ui/Counter";
import Solution from "./Solution";
import DialogUi from "../../../ui/DialogUi";
import Route from "../../../routes/Route";
import {
  calculateDuration,
  calculateDurationTaken,
} from "../../../util/CommonUtil";

const TakeTest = ({ details, setTakeTest, questions, route = "results" }) => {
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const questionStartTime = useRef(Date.now());
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    total: null,
  });
  const [showSubmit, setShowSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ipDetails, setIpDetails] = useState({
    ip: "",
    network: "",
    city: "",
    region: "",
    country_name: "",
    latitude: "",
    longitude: "",
  });

  const fetchIpDetails = async () => {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    setIpDetails((prev) => ({
      ...prev,
      ip: data?.ip,
      network: data?.network,
      city: data?.city,
      region: data?.region,
      country_name: data?.country_name,
      latitude: data?.latitude,
      longitude: data?.longitude,
    }));
  };
  useEffect(() => {
    fetchIpDetails();
  }, []);
  let intervalId = null;
  const deadline = new Date().getTime() + calculateDuration(details?.duration);
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeLeft = deadline - now;
      // Handle timer reaching zero
      if (deadline <= now) {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setShowSubmit(true);
        return;
      }
      // Calculate remaining days, hours, minutes, and seconds
      setHours(Math.floor(timeLeft / (1000 * 60 * 60)));
      setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
    };
    let intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  }, []);
  // Handle timer reaching zero (optional)
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(intervalId);
  }
  const currentItem = (
    <Solution
      index={currentIndex + 1}
      question={questions[currentIndex]}
      setSolvedQuestions={setSolvedQuestions}
      testId={details?.id}
      userId={userId}
      solvedQuestions={solvedQuestions}
    />
  );
  const nextHandle = () => {
    if (solvedQuestions?.length < currentIndex + 1) {
      setMessage("Please Submit a answer");
      setOpenNotification(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const submitSolutionHandle = async () => {
    setLoading(true);
    const solutions = {
      solvedQuestions,
      duration: calculateDurationTaken(Date.now() - questionStartTime.current),
      ipDetails: JSON.stringify({ ipDetails }),
    };
    try {
      const res = await Route("POST", `/${route}`, token, solutions, null);
      if (res?.status === 201) {
        console.log(res);
        setResult((prev) => ({
          ...prev,
          score: res?.data?.result?.score,
          total: res?.data?.result?.total,
        }));
        setMessage(res?.data?.message);
        setOpenNotification(true);
      } else {
        setMessage("Failed to submit solutions. Please try again.");
        setOpenNotification(true);
      }
    } catch (error) {
      setMessage("Failed to submit solutions. Please try again.");
      setOpenNotification(true);
    } finally {
      setLoading(false);
      setShowSubmit(true);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "100%" }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Take Test" />
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid item xs={12}>
              {details?.message !== "" && (
                <Stack sx={{ width: "100%" }} spacing={1}>
                  <Alert severity="info">{details?.message}</Alert>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: { xs: "space-between", md: "flex-end" },
                mt: { xs: 4, md: 0 },
              }}
            >
              <Counter value={hours} name="Hours" />
              <Counter value={minutes} name="Mins" />
              <Counter value={seconds} name="Secs" />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            {currentItem && currentItem}
          </Grid>
          <Grid
            item
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Grid item>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
                size="small"
              >
                {currentIndex > 0 && (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                  >
                    Previous
                  </Button>
                )}
                {questions?.length - 1 > currentIndex && (
                  <Button
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    onClick={nextHandle}
                  >
                    Next
                  </Button>
                )}
              </ButtonGroup>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            {questions?.length - 1 > currentIndex ? (
              <LoadingButton
                variant="contained"
                endIcon={<StopCircleIcon />}
                onClick={submitSolutionHandle}
                color="error"
              >
                End Test
              </LoadingButton>
            ) : (
              <LoadingButton
                variant="contained"
                endIcon={<PublishIcon />}
                onClick={submitSolutionHandle}
                loading={loading}
              >
                Submit
              </LoadingButton>
            )}
          </Grid>
        </Grid>
      </Box>
      {openNotification && (
        <Notification
          open={openNotification}
          setOpen={setOpenNotification}
          message={message}
        />
      )}
      {result?.total !== null && (
        <DialogUi
          title="Thank you for taking the time to participate in the test."
          message="Thank you for taking the time to participate in the test."
          score={result?.score}
          total={result?.total}
          open={showSubmit}
          setTakeTest={setTakeTest}
        />
      )}
    </>
  );
};

export default TakeTest;
