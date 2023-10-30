import React from "react";
import Box from "@mui/material/Box";

const Section = ({
  children,
  maxWidth,
  isFlush = false,
  isStacked = false,
  color = "common.white",
  height = {
    xs: 600,
    sm: 600,
  },
  styles = {},
  ...rest
}) => {
  return (
    <Box
      sx={{
        ...sx.root,
        px: {
          sm: isFlush ? 0 : 4,
          xs: isFlush ? 0 : 2,
        },
        py: {
          sm: isStacked ? 0 : 4,
          xs: isStacked ? 0 : 2,
        },
        minHeight: height,
        backgroundColor: color,
        ...styles,
      }}
    >
      {maxWidth ? (
        <Container maxWidth={maxWidth}>{children}</Container>
      ) : (
        children
      )}
    </Box>
  );
};

export default Section;

const sx = {
  root: {},
};
