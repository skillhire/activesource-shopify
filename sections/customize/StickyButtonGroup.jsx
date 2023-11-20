import React from "react";
import { Box } from "@mui/material";

const StickyButtonGroup = (props) => {
  const { children } = props || {};
  return (
    <Box sx={sx.root}>
      <Box sx={sx.divider} />
      <Box sx={sx.buttons}>{children}</Box>
    </Box>
  );
};

export default StickyButtonGroup;

const sx = {
  root: {
    width: {
      xs: "100%",
      sm: "50%",
      md: "480px",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "common.white",
    position: {
      xs: "fixed",
      sm: "fixed",
    },
    right: 0,
    bottom: 0,
  },
  divider: {
    height: "10px",
    width: {
      xs: "100%",
      sm: "80%",
    },
    borderTop: "1px solid",
    borderColor: "divider",
  },
  container: {
    width: "80%",
  },
  buttons: {
    my: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
};
