import React from "react";
import { Box } from "@mui/material";
import { useResponsive } from "hooks";

const VideoBox = ({ image, webm, mp4, shouldUseMobileFallback = false }) => {
  const { isMobile } = useResponsive();

  return (
    <Box sx={sx.root}>
      {shouldUseMobileFallback && isMobile ? (
        <img src={image} style={styles.media} />
      ) : (
        <video playsInline autoPlay loop muted style={styles.media}>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </Box>
  );
};

export default VideoBox;

const sx = {
  root: {
    width: "100%",
    height: "100%",
  },
};

const styles = {
  media: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
