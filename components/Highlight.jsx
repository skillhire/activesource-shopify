import React from "react";
import { Image } from "components";
import { Box, Typography } from "@mui/material";

const Highlight = ({ highlight = {} }) => {
  return (
    <Box sx={sx.highlight}>
      <Typography variant="h5" sx={sx.heading}>
        {highlight.heading}
      </Typography>
      <Typography variant="h3" sx={sx.title}>
        {highlight.title}
      </Typography>
      {highlight.subtitle.includes(".svg") ? (
        <Box sx={sx.subtitle}>
          <Image
            src={highlight.subtitle}
            height={16} // simulate string subtitles
            maxHeight={16} // simulate string subtitles
            styles={{ top: "4px" }} // simulate string subtitles
          />
        </Box>
      ) : (
        <Typography variant="body1" sx={sx.subtitle}>
          {highlight.subtitle}
        </Typography>
      )}
      <Image src={highlight.image} alt="Product Image" responsive />
      <Typography variant="button" sx={sx.caption}>
        {highlight.caption}
      </Typography>
    </Box>
  );
};

export default Highlight;

const sx = {
  highlight: {
    pt: 11,
    pb: 4,
    px: 2,
    textAlign: "center",
    backgroundColor: "background.paper",
  },
  heading: {
    height: "64px", // to account for variable content height, set at two lines
  },
  title: {
    height: "38px", // to account for variable content height, set at two lines
    mt: 5,
  },
  subtitle: {
    height: "54px", // to account for variable content height, set at two lines
    mt: 2,
    mb: 0.625,
  },
  caption: {
    height: "18px", // to account for variable content height, set at one line
    mt: 4,
  },
};
