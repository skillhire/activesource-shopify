import React from "react";
import {Box, Typography } from "@mui/material";
import { ProductGrid } from "components";
import { useResponsive } from "hooks";

const ProductsYouMayAlsoLike = (props) => {
  const { products, productUrl } = props || {};

  const { isMobile } = useResponsive();

  if (!products) return null;
  return (
    <Box my={3}>
      <Typography variant="h4" sx={sx.title}>
        You May Also Like
      </Typography>
      <ProductGrid
        variant={isMobile ? "carousel" : "grid"}
        products={products}
        productUrl={productUrl}
      />
    </Box>
  );
};

export default ProductsYouMayAlsoLike;

const sx = {
  title: {
    textAlign: "center",
    my: 2,
  },
};
