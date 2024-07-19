import React, { useEffect } from "react";
import { useCollections } from "hooks";
import { ProductCarousel, ProductGrid } from "components";
import { Box } from "@mui/material";

const ProductCollection = ({
  handle,
  perPage = 48,
  variant = "carousel",
  styles,
  productUrl,
  xs=12
}) => {
  const { loading, error, collection, fetchCollection, products } =
    useCollections();

  useEffect(() => {
    if (handle && perPage) {
      fetchCollection(handle, {
         first: perPage 
      });
    }
  }, [handle, perPage]);
  
  return (
    <Box sx={{ ...sx.root, ...styles }}>
      {variant == "carousel" && (
        <ProductCarousel
          title={collection?.title}
          loading={loading}
          products={products}
          productUrl={productUrl}
        />
      )}
      <Box sx={sx.gridContainer}>
        {variant == "grid" && (
          <ProductGrid
            xs={xs}
            rowSpacing={4}
            title={collection?.title}
            loading={loading}
            products={products}
            productUrl={productUrl}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductCollection;

const sx = {
  root: {
    py: 2,
    width: "100%",
  },
  gridContainer: {
    width: "100%",
    margin: "0 auto",
  },
};
