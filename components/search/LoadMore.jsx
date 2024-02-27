import React from "react";
import { Box, Button } from "@mui/material";

const LoadMore = ({ loading = false, hasNextPage = false, handleSearch }) =>
  hasNextPage ? (
    <Box sx={sx.loadMoreContainer}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
      >
        Load More
      </Button>
    </Box>
  ) : null;

export default LoadMore;

const sx = {
  loadMoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",

    my: 4,
  },
};
