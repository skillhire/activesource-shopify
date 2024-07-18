import React from "react";
import { Box, Link, Typography } from "@mui/material";

const ProductEnquireBulkDiscount = ({handleButtonClick}) => {
  return (
    <Box sx={sx.root} p={3} my={2}>
      <Typography variant="body2" mb={1}>
        Ordering more than 48 pieces of the same style?
      </Typography>
      <Link
        color="secondary"
        onClick={handleButtonClick}
        sx={sx.supportButton}
        variant="link"
      >
        Enquire for bulk discount
      </Link>
    </Box>
  );
};

export default ProductEnquireBulkDiscount;

const sx = {
  root: {
    background: (theme) => `${theme.palette.background.paper}`,
    borderRadius: 3,
  },
  supportButton: {
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "underline",
  },
};