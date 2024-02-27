import React from "react";
import { Box, Button } from "@mui/material";

const CarouselProgressDot = (props) => {
  const { onClick, numItems = 5, width = 960, styles = {} } = props;

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

export default CarouselProgressDot;

const sx = {
  button: {
    py: 1,
    px: 0,
    minWidth: "calc(100vw / 8)",
    mx: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  dot: {
    width: "100%",
    height: "4px",
    backgroundColor: "common.carousel",
    transition: "all 0.3s ease-in-out",
  },
  dotActive: {
    backgroundColor: "primary.main",
  },
};
