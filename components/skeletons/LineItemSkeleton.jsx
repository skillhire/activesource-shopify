import React from "react";
import PropTypes from "prop-types";
import { Box, Avatar } from "@mui/material";

import Skeleton from "@mui/material/Skeleton";

const LineItemSkeleton = ({ styles, ...props }) => {
  return (
    <Box display="flex" flexDirection="row" width="100%" sx={sx.root}>
      <Skeleton variant="rectangular" sx={sx.thumbnail}>
        <Avatar variant="square" sx={sx.avatar} />
      </Skeleton>
      <Box height="180" width={"100%"} justifyContent="flex-start">
        <Box sx={sx.line}>
          <Skeleton variant="rectangular" width="62%" height={14} />
        </Box>
        <Box sx={sx.line}>
          <Skeleton variant="rectangular" width="38%" height={14} />
        </Box>
        <Box sx={sx.line}>
          <Skeleton variant="rectangular" width="23%" height={14} />
        </Box>
      </Box>
    </Box>
  );
};

LineItemSkeleton.propTypes = {
  styles: PropTypes.object,
};

export default LineItemSkeleton;

const sx = {
  root: {
    mb: 5,
  },
  thumbnail: {
    mr: 2,
  },
  avatar: {
    height: 72,
    width: 72,
  },
  line: {
    mb: 0.8,
  },
  thumbnail: {
    mr: 2,
  },
};
