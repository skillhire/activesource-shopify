import React from "react";
import { IconButton } from "@mui/material";
import { ChevronRight } from "lucide-react";

const CarouselRightArrow = ({ onClick, ...props }) => {
  return (
    <IconButton
      variant="contained"
      sx={sx.button}
      onClick={onClick}
      size="large"
    >
      <ChevronRight />
    </IconButton>
  );
};

export default CarouselRightArrow;

const sx = {
  icon: {
    height: 32,
    width: 32,
  },
  button: {
    p: 0,
    "&": {
      backgroundColor: "common.white",
      position: "absolute",
      right: 4,
    },
  },
};
