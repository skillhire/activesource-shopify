import React from "react";
import { Typography } from "@mui/material";

const Heading = ({ children, ...props }) => {
  return (
    <Typography my={2} sx={sx.root} variant="h3" {...props}>
      {children}
    </Typography>
  );
};

export default Heading;

const sx = {
  root: {
    width: "100%",
    textAlign: "center",
  },
};
