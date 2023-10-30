import React from "react";
import { IconButton } from "@mui/material";
import { ChevronLeft } from "lucide-react";

const CarouselLeftArrow = ({ onClick, ...props }) => {
  return (
    <IconButton
      variant="contained"
      sx={sx.button}
      onClick={onClick}
      size="large"
    >
      <ChevronLeft />
    </IconButton>
  );
};

export default CarouselLeftArrow;

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
      left: 4,
    },
  },
};
