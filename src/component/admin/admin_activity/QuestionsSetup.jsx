import React from "react";
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SubHeader from "../../../common/SubHeader";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Transition from "../../../common/Transition";
import SlideSection from "./question_setup_section/SlideSection";
import MainSlide from "./question_setup_section/MainSlide";

const QuestionsSetup = ({ setQuestionsSetUp }) => {
  const [cancel, setCancel] = React.useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} alignItems="center" sx={{ px: 2 }}>
          <SubHeader text="Add Questions | Questions Setup" />
          <Grid item container alignItems="center" sx={{ px: 2 }} xs={12}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button variant="contained" sx={{ mr: 2 }} endIcon={<SaveIcon />}>
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                endIcon={<CancelIcon />}
                onClick={() => setCancel(true)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <SlideSection />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={8} sx={{ px: 2, height: "100%" }}>
              <MainSlide />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {cancel ? (
        <Dialog
          open={cancel}
          onClose={() => setCancel(false)}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <Typography variant="h6">Confirmation</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">
              Are you sure you want to cancel? All the questions set up will be
              lost.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mx: 2 }}>
            <Button
              onClick={() => setQuestionsSetUp(false)}
              variant="contained"
              autoFocus
              size="small"
            >
              Confirm
            </Button>
            <Button
              onClick={() => setCancel(false)}
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

export default QuestionsSetup;
