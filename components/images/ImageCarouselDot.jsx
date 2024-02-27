import React from "react";
import { Box, Button } from "@mui/material";

const ImageCarouselDot = (props) => {
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
    <Button disableRipple sx={sx.button} onClick={() => onClick()}>
      <Box
        sx={{
          ...sx.dot,
          minWidth: {
            sm: `${parseInt(width / numItems)}px`,
            xs: `calc((100vw / ${numItems}) - 20px)`,
          },
          ...(active && sx.dotActive),
          ...styles,
        }}
      />
    </Button>
  );
};

export default ImageCarouselDot;

const sx = {
  button: {
    pb: 2,
    px: 0,
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
