import React from "react";
import { Box, Button } from "@mui/material";

const CarouselDotContrast = (props) => {
  const { onClick, numItems = 5, width = 960, styles = {} } = props || {};

  const {
    onMove,
    index,
    active,
    carouselState: { currentSlide, deviceType },
  } = props;
  // onMove means if dragging or swiping in progress.
  // active is provided by this lib for checking if the item is active or not.
  return (
    <Button
      disableRipple
      sx={sx.button}
      className={active ? "active" : "inactive"}
      onClick={() => onClick()}
    >
      <Box
        sx={{
          ...sx.dot,
          minWidth: {
            sm: `${parseInt(width / numItems)}px`,
            xs: `calc(100vw / ${numItems})`,
          },
          ...(active && sx.dotActive),
          ...styles,
        }}
      />
    </Button>
  );
};

export default CarouselDotContrast;

const sx = {
  button: {
    py: 0,
    px: 0,
    mx: "0px",
    height: "4px",
    minHeight: "4px",
    borderRadius: "0px",
    "&:hover": {
      backgroundColor: "#9796AC",
    },
  },
  dot: {
    height: "4px",
    backgroundColor: "#9796AC",
    transition: "all 0.3s ease-in-out",
  },
  dotActive: {
    backgroundColor: "common.white",
  },
};
