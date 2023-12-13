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
      {variant == "grid" && (
        <ProductGrid
          title={collection?.title}
          loading={loading}
          products={products}
        />
      )}
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
  root: {
    py: 2,
  },
};
