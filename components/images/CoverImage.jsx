import React from "react";
import { Box, Skeleton } from "@mui/material";

const CoverImage = ({
  children,
  src,
  objectFit = "cover",
  height = { xs: 450, sm: 750 },
  width = "100%",
  ...props
}) => {
  return src ? (
    <Box
      sx={{
        ...sx.root,
        backgroundImage: `url(${src})`,
        height: height,
        backgroundSize: objectFit,
      }}
    >
      {children}
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={width} height={height} />
  );
};

export default CoverImage;

const sx = {
  root: {
    display: "flex",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
  },
};
