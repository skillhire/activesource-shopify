import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Page = ({ title, subtitle, body, html = false, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={sx.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" sx={sx.subtitle}>
            {subtitle}
          </Typography>
        )}
        {html ? (
          <Box dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <Typography variant="body1" sx={sx.text}>
            {body}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default Page;

const sx = {
  root: {
    my: 8,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
  },
  text: {
    whiteSpace: "pre-wrap",
  },
};
