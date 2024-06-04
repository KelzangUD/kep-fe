import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Alert, Stack } from "@mui/material";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublishIcon from '@mui/icons-material/Publish';
import SubHeader from "../../../common/SubHeader";
import Notification from "../../../ui/Notification";
import Counter from "../../../ui/Counter";
import Solution from "./Solution";
import Route from "../../../routes/Route";

const TakeTest = ({ id, details, setTakeTest }) => {
  const [testDetails, setTestDetails] = useState(details);
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [result, setResult] = useState({
    user: JSON.parse(localStorage.getItem("user"))?.id,
    test: details?.id,
    score: 0,
    total: null,
  });
  const token = localStorage.getItem("token");
  const fetchTests = async () => {
    const res = await Route("GET", "/tests", token, null, id);
    if (res?.status === 200) {
      setQuestions(res?.data?.questions);
    } else {
      setMessage(res?.data?.message);
      setOpenNotification(true);
    }
  };
  useEffect(() => {
    console.log(details);
    fetchTests();
  }, []);
  useEffect(() => {
    setResult(prev => ({
      ...prev,
      total: questions?.reduce((accumulator, item) => {
        return accumulator + item?.point;
      }, 0)
    }));
  }, [questions]);
  const currentItem = (
    <Solution index={currentIndex + 1} question={questions[currentIndex]} setResult={setResult} setSolvedQuestions={setSolvedQuestions} />
  );
  const nextHandle = () => {
    if(solvedQuestions?.length < currentIndex+1) {
      setMessage("Please Submit a answer");
      setOpenNotification(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Take Test" />
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {testDetails?.message !== "" && (
              <Stack sx={{ width: "80%" }} spacing={2}>
                <Alert severity="info">{testDetails?.message}</Alert>
              </Stack>
            )}
            <Counter value="24" name="Hours" />
            <Counter value="60" name="Mins" />
            <Counter value="60" name="Secs" />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              endIcon={<StopCircleIcon />}
              sx={{ mr: 2 }}
              onClick={() => setTakeTest(false)}
            >
              End Test
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
            {currentItem && currentItem}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            {questions?.length - 1 > currentIndex ? (
              <Button
                variant="outlined"
                endIcon={<ArrowForwardIcon />}
                sx={{ mr: 2 }}
                onClick={nextHandle}
              >
                Next
              </Button>
            ) : (<Button
            variant="outlined"
            startIcon={<PublishIcon />}
            sx={{ mr: 2 }}
            // onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Submit
          </Button>
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
    </>
  );
};

export default TakeTest;
