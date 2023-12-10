import * as React from "react";
import { Box, Button } from "@mui/material";
import Slide from "./question_setup_section/Slide";
import AddIcon from '@mui/icons-material/Add';

const SlideSection = () => {
  return (
    <Box sx={{ px: 2, minWidth: "100%" }}>
      <Slide />
      <Button
        aria-label="add slide"
        size="small"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
      >
        Add Slide
      </Button>
    </Box>
  );
};

export default SlideSection;
