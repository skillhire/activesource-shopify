import React, { useState, useContext, useEffect, useRef } from "react";
import {
  useCloudinary,
  useProducts,
  useVariants,
  useResponsive,
  useSegment,
} from "hooks";
import { useRouter } from "next/router";
import { Box, Container, Grid } from "@mui/material";
import {
  Layout,
  ProductDetails,
  ProductImages,
  ProductGrid,
  ProductTabs,
} from "components";
import ProductCustomize from "components/products/ProductCustomize";
import { CustomizeContext } from "context";
import { getValue } from "utils";
import PlacementModal from "sections/products/PlacementModal";
import { PLACEMENTS } from "constants/placements";

const Product = () => {
  const ref = useRef();
  const router = useRouter();

  const { handle } = router.query;

  const { customization, setCustomization } = useContext(CustomizeContext);

  const { isMobile } = useResponsive();
  const { trackProductViewed } = useSegment();

  const [zoom, setZoom] = useState(false);
  const [activeImage, setActiveImage] = useState();
  const [placement, setPlacement] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [frontOrBack, setFrontOrBack] = useState("front");

  const [activeColor, setActiveColor] = useState();

  const { loading, product, recommendedProducts, images, fetchProduct } =
    useProducts();

  const { variant, setVariant, variantImage } = useVariants({
    product,
    selectedOptions,
  });

  const handleUpload = async (image, frontOrBack) => {
    if (frontOrBack == "front") {
      setCustomization({
        ...customization,
        frontLogo: image,
      });
    } else if (frontOrBack == "back") {
      setCustomization({
        ...customization,
        backLogo: image,
      });
    }
  };

  const handlePreviewClick = (imgSrc, frontOrBack) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImage({
      id: frontOrBack,
      src: imgSrc,
      isFront: frontOrBack == "front" ? true : false,
      isBack: frontOrBack == "back" ? true : false,
    });
  };

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
    setActiveColor(color);
  };

  const handlePlacementClick = (frontOrBack) => {
    setFrontOrBack(frontOrBack);
    setOpenModal(true);
  };

  const handleSelectPlacement = (newPlacement) => {
    setPlacement({
      ...placement,
      [frontOrBack]: newPlacement,
    });
    setCustomization({
      ...customization,
      [frontOrBack]: newPlacement,
    });
    setOpenModal(false);
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
    // Reset the selected options values when the product changes
    setSelectedOptions({});
    if (product?.id) {
      trackProductViewed(product);
    }
  }, [product?.id]);

  const handleAddToCartDisabled = () => {
    const disabled = !variant;
    setAddToCartDisabled(disabled);
  };

  useEffect(() => {
    handleAddToCartDisabled();
  }, [product, selectedOptions, variant, setAddToCartDisabled]);

  // Set values from encoded JWT URL param
  useEffect(() => {
    if (customization?.color) {
      // Ensure the color metaobject is selected
      setActiveColor(customization?.color);
      // Default to the front placement image
      setActiveImage({
        id: "front",
        src: customization?.color?.front_placement,
        isFront: true,
        isBack: false,
      });
    }

    // Find the variant from the variantId
    if (product?.variants && customization?.variantId) {
      const selectedVariant = product?.variants?.edges?.find(
        (v) => v?.node?.id?.split("/").pop() == customization?.variantId
      );
      if (selectedVariant?.node) {
        setVariant(selectedVariant.node);
      }

      // Set the product selected options from Variant ID
      setSelectedOptions({
        ...selectedOptions,
        Color: selectedVariant?.node?.selectedOptions?.find(
          (o) => o?.name == "Color"
        )?.value,
        Size: selectedVariant?.node?.selectedOptions?.find(
          (o) => o?.name == "Size"
        )?.value,
      });
    }
  }, [product, customization?.color, customization?.variantId]);

  useEffect(() => {
    if (activeColor) {
      // Store color with the customization object
      setCustomization({
        ...customization,
        color: activeColor,
      });
      // Select the product color option that
      // matches the meta color name field. This is necessary
      // to ensure the correct color / size SKU is assigned at checkout
      setSelectedOptions({
        ...selectedOptions,
        Color: activeColor?.name,
      });
    }
  }, [activeColor]);

  useEffect(() => {
    if (variant?.id) {
      setCustomization({
        ...customization,
        variantId: variant?.id?.split("/").pop(),
      });
    }
  }, [variant?.id]);

  return (
    <Layout metaTitle={product?.title} metaDescription={product?.description}>
      <Container maxWidth="lg">
        <Box sx={sx.root} ref={ref}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7} lg={8}>
              <Box>
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
                activeColor={activeColor}
                addToCartDisabled={addToCartDisabled}
                selectedOptions={selectedOptions}
                handleColorClick={handleColorClick}
                handleOptionChange={handleOptionChange}
              />
              <ProductCustomize
                product={product}
                handleClick={handlePlacementClick}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                handleUpload={handleUpload}
                handlePreviewClick={handlePreviewClick}
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
        </Box>
      </Container>
      <PlacementModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        frontOrBack={frontOrBack}
        placement={placement[frontOrBack]}
        handleClick={handleSelectPlacement}
      />
    </Layout>
  );
};

export default Product;

const sx = {
  root: {
    py: 4,
  },
};
