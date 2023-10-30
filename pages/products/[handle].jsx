import React, { useState, useEffect, useRef } from "react";
import { useProducts, useVariants, useResponsive, useSegment } from "hooks";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import {
  Layout,
  ProductDetails,
  ProductImages,
  ProductGrid,
  ProductTabs,
} from "components";
import ProductCustomizeModal from "components/products/ProductCustomizeModal";
import { getValue } from "utils";

const Product = () => {
  const ref = useRef();

  const router = useRouter();
  const { handle } = router.query;
  const { isMobile } = useResponsive();

  const [color, setColor] = useState();
  const [activeImage, setActiveImage] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [zoom, setZoom] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const { trackProductViewed } = useSegment();

  // Handle custom variant option metaobjects
  const [customAttributes, setCustomAttributes] = useState({});

  const { loading, product, recommendedProducts, images, fetchProduct } =
    useProducts();

  const { variant, variantImage } = useVariants({
    product,
    selectedOptions,
  });

  const handleImageClick = (image) => {
    if (image?.id === activeImage?.id) {
      setZoom(true);
    } else {
      setActiveImage(image);
    }
  };

  const handleClose = () => {
    setZoom(false);
  };

  const handleOptionChange = (name, value) => {
    setSelectedOptions({
      ...selectedOptions,
      [name]: value,
    });
  };

  const handleColorClick = (color) => {
    setColor(color);
    setCustomAttributes({
      ...customAttributes,
      color: getValue(color, "label"),
    });
  };

  const handleCustomize = () => {
    setShowCustomize(true);
  };

  const handleCustomizeChange = (placement, file) => {
    console.log(placement, file);
  };

  useEffect(() => {
    if (handle) {
      fetchProduct(handle);
    }
  }, [handle]);

  useEffect(() => {
    setActiveImage(variantImage || product?.images?.edges[0]?.node);
  }, [product, variantImage]);

  useEffect(() => {
    setSelectedOptions({});
    if (product?.id) {
      trackProductViewed(product);
    }
  }, [product?.id]);

  return (
    <Layout title={product?.title} metaDescription={product?.description}>
      <Container maxWidth="lg">
        <Box sx={sx.root} ref={ref}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={7} lg={8}>
              <Box sx={sx.imagePane}>
                <ProductImages
                  images={images}
                  activeImage={activeImage}
                  handleClick={handleImageClick}
                  zoom={zoom}
                  handleClose={handleClose}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <ProductDetails
                loading={loading}
                product={product}
                variant={variant}
                selectedOptions={selectedOptions}
                handleOptionChange={handleOptionChange}
                handleColorClick={handleColorClick}
                customAttributes={customAttributes}
                handleCustomizeClick={handleCustomize}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductTabs product={product} />
            </Grid>
            <Grid item xs={12}>
              <ProductGrid
                variant={isMobile ? "carousel" : "grid"}
                products={recommendedProducts}
              />
            </Grid>
          </Grid>
          <ProductCustomizeModal
            open={showCustomize}
            handleClose={() => setShowCustomize(false)}
            color={color}
            product={product}
            customAttributes={customAttributes}
            handleChange={handleCustomizeChange}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Product;

const sx = {
  root: {
    py: 4,
  },
  imagePane: {
    backgroundColor: "background.paper",
  },
};
