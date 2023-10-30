import React from "react";
import { Box, Typography } from "@mui/material";

const Circle = ({ size = 28, styles = {}, children }) => {
  return (
    <Box
      sx={{
        ...sx.root,
        width: size,
        height: size,
        ...styles,
      }}
    >
      <Typography sx={sx.text} variant="button">
        {children}
      </Typography>
    </Box>
  );
};

export default Circle;

const sx = {
  root: {
    height: "54px",
    width: "54px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: 1,
    borderRadius: "50%",
    borderColor: "primary.main",
    color: "primary.main",
  },
  text: {
    mt: 0.5,
  },
};
