import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const Page = ({ title, subtitle, image, body, html = false, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Image
        src={image}
        width={1200}
        height={300}
        alt={title}
        style={{
          width: "100%",
          objectFit: "cover",
        }}
        responsive
      />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={sx.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" sx={sx.subtitle}>
            {subtitle}
          </Typography>
        )}
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

export default Page;

const sx = {
  root: {
    my: 8,
  },
  title: {
    mt: 6,
    mb: 4,
  },
  text: {
    whiteSpace: "pre-wrap",
  },
};
