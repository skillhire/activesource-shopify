import React, { useEffect } from "react";
import PropTypes from "prop-types";
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
            products={products}
          />
        )}
      </Box>
    </Box>
  );
};

ProductCollection.propTypes = {
  handle: PropTypes.string.isRequired,
  products: PropTypes.array,
  variant: PropTypes.oneOf(["carousel", "grid"]),
  query: PropTypes.string,
  styles: PropTypes.object,
};

export default ProductCollection;

const sx = {
  root: { py: 2 },
  gridContainer: { margin: "0 auto", maxWidth: { xs: 265 } },
};
