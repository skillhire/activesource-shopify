import React from "react";
import { Box } from "@mui/material";

const TwoColumn = ({ children, rtl = false, styles = {} }) => {
  return (
    <Box
      sx={{
        ...sx.root,
        ...(rtl && sx.rtl),
        ...styles,
      }}
    >
      <Box sx={sx.leftColumn}>{children && children[0]}</Box>
      <Box sx={sx.rightColumn}>{children && children[1]}</Box>
    </Box>
  );
};

export default TwoColumn;

const sx = {
  root: {
    width: "100vw",
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    justifyContent: "space-between",
    width: "100%",
  },
  rtl: {
    flexDirection: {
      xs: "column",
      sm: "row-reverse",
    },
  },
  leftColumn: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: {
      xs: "100%",
      sm: "50%",
    },
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: {
      xs: "100%",
      sm: "50%",
    },
  },
};
