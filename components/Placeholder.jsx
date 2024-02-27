import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const Placeholder = ({ icon, title, subtitle, actions, ...props }) => {
  return (
    <Box sx={sx.root}>
      {icon && <Avatar sx={sx.avatar}>{icon}</Avatar>}
      <Typography variant="h6" mt={2}>
        {title}
      </Typography>
      <Typography mt={2} variant="body1" color="textPrimary">
        {subtitle}
      </Typography>
      <Box sx={sx.actions}>{actions}</Box>
    </Box>
  );
};
export default Placeholder;

const sx = {
  root: {
    p: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  avatar: {
    height: "50px",
    width: "50px",
    mb: 2,
    color: "icon",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    mt: 1,
  },
};
