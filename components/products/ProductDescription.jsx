import React from "react";
import { Box, Typography } from "@mui/material";

const ProductDescription = ({ product }) => {
  if (!product?.descriptionHtml) return null;
  return (
    <Typography variant="body1">
      <Box
        dangerouslySetInnerHTML={{
          __html: product?.descriptionHtml,
        }}
      />
    </Typography>
  );
};

export default ProductDescription;
