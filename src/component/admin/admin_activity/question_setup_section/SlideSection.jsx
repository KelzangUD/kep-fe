import * as React from "react";
import { Box, Button } from "@mui/material";
import Slide from "./Slide";
import AddIcon from '@mui/icons-material/Add';

const SlideSection = ({addSlideHandler}) => {
  return (
    <Box sx={{ px: 2, minWidth: "100%" }}>
      <Slide />
      <Button
        aria-label="add slide"
        size="small"
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        onClick={addSlideHandler}
      >
        Add Slide
      </Button>
    </Box>
  );
};

export default SlideSection;
