import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useProducts } from "hooks";
import { Button, Typography } from "@mui/material";
import { ProductCarousel, ProductGrid } from "components";
import { Box } from "@mui/material";

const ProductRecommendations = ({ productId, variant = "grid", styles }) => {
  const router = useRouter();
  const [similarProducts, setSimilarProducts] = useState();

  const { loading, products, fetchProductRecommendations } = useProducts();

  const handleButtonClick = () => {
    router.push("/browse");
  };

  useEffect(() => {
    if (productId) {
      fetchProductRecommendations(productId);
    }
  }, [productId]);

  // Hide the current product and any products marked hidden
  useEffect(() => {
    if (products) {
      setSimilarProducts(products);
    }
  }, [products]);

  return (
    <Box className={"sticky-block-el"} sx={{ ...sx.root, ...styles }}>
      <Typography variant="h5" sx={sx.title}>
        SIMILAR PRODUCTS
      </Typography>
      {variant == "carousel" && (
        <ProductCarousel loading={loading} products={similarProducts} />
      )}
      {variant == "grid" && (
        <ProductGrid loading={loading} products={similarProducts} />
      )}
      <Button variant="outlined" onClick={handleButtonClick} sx={sx.button}>
        SHOP ALL
      </Button>
    </Box>
  );
};

export default ProductRecommendations;

const sx = {
  root: {
    px: {
      xs: 0,
      md: 3.5,
    },
    py: {
      xs: 4,
      md: 13.5,
    },
    pb: {
      xs: 8,
    },
    textAlign: "center",
  },
  title: {
    mb: {
      xs: 4,
      md: 8,
    },
    textAlign: "center",
  },
  button: {
    mt: 4,
  },
};
