import React from "react";
import { CoverImage } from "components";
import { Box, Typography } from "@mui/material";

const Hero = ({ image, height, title, subtitle, actions }) => {
  return (
    <CoverImage height={height} image={image}>
      <Typography variant="h1" sx={sx.title}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={sx.subtitle}>
        {subtitle}
      </Typography>
      {actions && <Box sx={sx.actions}>{actions}</Box>}
    </CoverImage>
  );
};

export default Hero;

const sx = {
  title: {
    color: "primary.contrastText",
  },
  subtitle: {
    color: "primary.contrastText",
  },
  actions: {},
};
