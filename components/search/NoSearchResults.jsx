import React from "react";
import { Box, Typography } from "@mui/material";

const NoSearchResults = () => {
  return (
    <Box sx={sx.root}>
      <Typography mb={2} variant="subtitle1" color="textPrimary">
        No search results
      </Typography>
      <Typography variant="body2" color="textPrimary" sx={sx.text}>
        Please try another query
      </Typography>
    </Box>
  );
};

export default NoSearchResults;

const sx = {
  root: {
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};
