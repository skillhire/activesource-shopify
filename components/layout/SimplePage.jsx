import React from "react";
import { Box, Container, Typography } from "@mui/material";

const SimplePage = ({
  title,
  subtitle,
  image,
  body,
  html = false,
  ...props
}) => {
  return (
    <Box sx={sx.root}>
      <Container maxWidth="md" sx={sx.container}>
        <Typography variant="h3" sx={sx.title}>
          {title}
        </Typography>
        {html ? (
          <Typography
            variant="body2"
            sx={sx.text}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <Typography variant="body2" sx={sx.text}>
            {body}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SimplePage;

const sx = {
  root: {
    py: "200px",
  },
  title: {
    mb: "40px",
  },
  text: {
    whiteSpace: "pre-wrap",
    "& p": {
      m: "auto",
    },
    "& h2": {
      lineHeight: "1.3em",
    },
  },
  container: {
    maxWidth: "776px",
  },
};
