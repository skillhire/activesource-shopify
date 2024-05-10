import React, { useEffect } from "react";
import { useCollections } from "hooks";
import { ProductCarousel, ProductGrid } from "components";
import { Box } from "@mui/material";

const ProductCollection = ({
  handle,
  perPage = 20,
  variant = "carousel",
  styles,
}) => {
  const { loading, error, collection, fetchCollection, products } =
    useCollections();

  useEffect(() => {
    if (handle) {
      fetchCollection(handle, perPage);
    }
  }, [handle]);

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      {variant == "carousel" && (
        <ProductCarousel
          title={collection?.title}
          loading={loading}
          products={products}
        />
      )}
      <Box sx={sx.gridContainer}>
        {variant == "grid" && (
          <ProductGrid
            xs={12}
            rowSpacing={4}
            title={collection?.title}
            loading={loading}
            products={products?.splice(0, 4)}
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
    width: '100%',
    margin: "0 auto", 
  },
};
