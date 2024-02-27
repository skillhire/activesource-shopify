import React from "react";
import { Box, Typography } from "@mui/material";

const Panel = (props) => {
  const { title, subtitle, actions, children, height = 400 } = props || {};

  return (
    <Box sx={sx.root}>
      <Box sx={sx.header}>
        <Typography variant="h5" sx={sx.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body1" sx={sx.subtitle}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          ...sx.content,
          height: `${height}px`,
        }}
      >
        {children}
      </Box>
      <Box sx={sx.footer}>{actions}</Box>
    </Box>
  );
};

export default Panel;

const sx = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    overflowY: "scroll",
  },
  header: {
    mt: 2,
    px: {
      sm: 2,
      xs: 6,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  subtitle: {
    py: 2,
    textAlign: "center",
    maxWidth: "400px",
  },
  spacer: {
    width: "64px",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "700px",
    px: {
      xs: 2,
      sm: 6,
    },
  },
};
