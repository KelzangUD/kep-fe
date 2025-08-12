import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { CircularProgress } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={240}
        sx={{
          color: "primary.main", // foreground (progress) color
          backgroundColor: "transparent", // optional
          position: "relative",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
          "&.MuiCircularProgress-root": {
            backgroundColor: "rgba(0,0,0,0.1)", // background track color
            borderRadius: "50%",
          },
          "& .MuiCircularProgress-circleDeterminate": {
            stroke: "#4caf50", // ✅ foreground stroke color
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" component="div" color="text.secondary">
          {props.score}/{props.total}
        </Typography>
      </Box>
    </Box>
  );
}

export default function DialogUi({ title, score, total, open, setTakeTest }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "center", mt:2 }}>
          Your Score
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgressWithLabel
              value={(score / total) * 100}
              score={score}
              total={total}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DialogContentText id="alert-dialog-description">
              {title}
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button onClick={() => setTakeTest(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
