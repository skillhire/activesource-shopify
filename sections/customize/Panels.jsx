import React, { useContext } from "react";
import { CustomizeContext } from "context";
import { Box } from "@mui/material";
import StartPanel from "./StartPanel";

const Panels = () => {
  return (
    <Box sx={sx.root}>
      <StartPanel />
    </Box>
  );
};

export default Panels;

const sx = {
  root: {},
};
