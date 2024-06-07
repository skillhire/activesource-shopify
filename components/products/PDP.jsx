import React, { useState, useContext, useEffect } from "react";
import { useVariants, useSegment, useContact, useCustomization, usePlacements } from "hooks";
import { Box, Container, Grid, Button, CircularProgress } from "@mui/material";
import {
  ProductDetails,
  ProductImages,
  ProductTabs,
  ProductContactSupport,
  ProductEnquireBulkDiscount
} from "components";
import ProductCustomize from "components/products/ProductCustomize";
import ProductAddToCart from "components/products/ProductAddToCart";
import ProductsYouMayAlsoLike from "components/products/ProductsYouMayAlsoLike";
import { CustomizeContext } from "context";
import PlacementModal from "sections/products/PlacementModal";
import { getMetaValue, getProductColors } from "utils";
import ContactModal from "../contact/ContactModal";

const Product = ({
  loading,
  handle,
  product,
  recommendedProducts,
  images,
  productUrl,
  disableShipping,
  disableFileGuidelines,
  ...props
}) => {
  const {
    setNotForSale,
    setDisableLogo,
    setDisablePlacement,
    activeImage,
    setActiveImage,
    activePlacement,
    setActivePlacement,
    activeColor,
    setActiveColor,
    customization,
    setCustomization,
  } = useContext(CustomizeContext);

  const { trackProductViewed } = useSegment();
  const { notForSale } = useCustomization();
  const { loading: emailLoading, sendContactEmail, errors } = useContact();
  const { activePlacements, fetchAllPlacements, filterPlacements } = usePlacements();

  const [zoom, setZoom] = useState(false);
  const [placements, setPlacements] = useState({});
  const [isEnterprise, setIsEnterprise] = useState();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [frontOrBack, setFrontOrBack] = useState("front");
  const [openContactModal, setOpenContactModal] = useState(false);
  const [contactModalTitle, setContactModalTitle] = useState("");

  const { variant, setVariant } = useVariants({
    product,
    selectedOptions,
  });

  const handleUpload = async (image, frontOrBack) => {
    // Store the original logo files
    if (frontOrBack == "front") {
      setCustomization({
        ...customization,
        print_logo_1: image,
      });
    } else if (frontOrBack == "back") {
      setCustomization({
        ...customization,
        print_logo_2: image,
      });
    }
  };

  const handlePreviewClick = (imgSrc, frontOrBack) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFrontOrBack(frontOrBack);
    let activePreview;

    if (frontOrBack == "front") {
      activePreview = customization?.print_preview_1
        ? customization?.print_preview_1
        : imgSrc;
      setCustomization({
        ...customization,
        print_background_1: imgSrc,
      });
    } else if (frontOrBack == "back") {
      activePreview = customization?.print_preview_2
        ? customization?.print_preview_2
        : imgSrc;
      setCustomization({
        ...customization,
        print_background_2: imgSrc,
      });
    }

    setActiveImage({ url: activePreview });
  };

  const handleImageClick = (image) => {
    if (image?.url == activeImage?.url) {
      setZoom(true);
    } else {
      setActiveImage({ url: image?.url });
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
    setActiveImage({
      url:
        color?.print_preview_1 ||
        color?.front_placement ||
        customization?.print_preview_1,
    });
    let newCustomization = { ...customization };

    let {
      front_placement,
      print_url_1,
      print_url_1_stakes,
      print_preview_1,
      print_location_1,

      back_placement,
      print_url_2,
      print_url_2_stakes,
      print_preview_2,
      print_location_2,
    } = color || {};

    newCustomization = {
      ...newCustomization,
      print_background_1:
        front_placement || newCustomization?.print_background_1,
      print_url_1: print_url_1 || newCustomization?.print_url_1,
      print_url_1_stakes: print_url_1_stakes || newCustomization?.print_url_1_stakes,
      print_preview_1: print_preview_1 || newCustomization?.print_preview_1,
      print_location_1: print_location_1 || newCustomization?.print_location_1,

      print_background_2:
        back_placement || newCustomization?.print_background_2,
      print_url_2: print_url_2 || newCustomization?.print_url_2,
      print_url_2_stakes: print_url_2_stakes || newCustomization?.print_url_2_stakes,
      print_preview_2: print_preview_2 || newCustomization?.print_preview_2,
      print_location_2: print_location_2 || newCustomization?.print_location_2,
    };

    setCustomization(newCustomization);

    setSelectedOptions({
      ...selectedOptions,
      Color: color?.name,
    });
  };

  const handlePlacementClick = (frontOrBack) => {
    setFrontOrBack(frontOrBack);
    setOpenModal(true);
  };

  const handleSelectPlacement = (newPlacement) => {
    setActivePlacement({
      ...activePlacement,
      [frontOrBack]: newPlacement,
    });
    let newCustomization = { ...customization };
    if (frontOrBack == "front") {
      newCustomization = {
        ...newCustomization,
        print_placement_1: newPlacement,
        print_location_1: newPlacement?.code,
      };
    }
    if (frontOrBack == "back") {
      newCustomization = {
        ...customization,
        print_placement_2: newPlacement,
        print_location_2: newPlacement?.code,
      };
    }
    setCustomization(newCustomization);
    setActiveImage({
      id: frontOrBack,
      url: activeColor?.[`${frontOrBack}_placement`],
    });
    setOpenModal(false);
  };

  const handleReset = () => {
    setActivePlacement({});
    setCustomization({
      ...customization,
      // Intentionally do not delete print_logos
      print_location_1: null,
      print_preview_1: null,
      print_type_1: "DigitalPrint",
      file_extension_1: "png",
      print_placement_1: null,

      print_location_2: null,
      print_preview_2: null,
      print_type_2: "DigitalPrint",
      file_extension_2: "png",
      print_placement_1: null,
    });
    setActiveImage({ url: null });
    setSelectedOptions({});
    setVariant(null);
    setAddToCartDisabled(true);
  };

  const handleContactSubmit = (data) => {
    sendContactEmail({...data, product: product.onlineStoreUrl})
      .then((res) => setOpenContactModal(false))
      .catch((error) => console.log(error.message))
  };

  const handleOpenContactModal = (title) => {
    setContactModalTitle(title);
    setOpenContactModal(true);
  };

  useEffect(() => {
    if (product?.handle) {
      handleReset();
    }
  }, [product?.handle]);

  // Set values from encoded JWT URL param
  useEffect(() => {
    // Find the variant from the variantId
    if (product?.variants && customization?.variantId) {
      const selectedVariant = product?.variants?.edges?.find(
        (v) => v?.node?.id?.split("/").pop() == customization?.variantId
      );
      if (selectedVariant?.node) {
        setVariant(selectedVariant.node);
      }

      let selectedColor = selectedVariant?.node?.selectedOptions?.find(
        (o) => o?.name == "Color"
      )?.value;

      let selectedSize = selectedVariant?.node?.selectedOptions?.find(
        (o) => o?.name == "Size"
      )?.value;

      let newSelectedOptions = {
        ...selectedOptions,
      };

      if (selectedColor) {
        newSelectedOptions = {
          ...newSelectedOptions,
          Color: selectedColor,
        };
      }

      if (selectedSize) {
        newSelectedOptions = {
          ...newSelectedOptions,
          Size: selectedSize,
        };
      }

      // Set the product selected options from Variant ID
      setSelectedOptions(newSelectedOptions);
    }
  }, [product, customization?.variantId]);

  // Default select the first color option
  useEffect(() => {
    if (product?.id) {
      let colors = getProductColors(product);
      if (colors.length > 0) {
        let firstColor = colors[0];
        handleColorClick(firstColor);
        setCustomization({
          ...customization,
          print_background_1: firstColor?.front_placement,
          print_background_2: firstColor?.back_placement,
        });
      }
    }
  }, [product?.id]);

  useEffect(() => {
    if (variant?.sku) {
      setCustomization({
        ...customization,
        print_sku: variant.sku,
      });
    }
  }, [variant?.sku]);

  // Auto-select placement for tote bags
  useEffect(() => {
    if (product?.productType == "Bag") {
      const defaultPlacementFront = placements?.front[0];
      const defaultPlacementBack = placements?.back[0];
      setActivePlacement({
        front: [defaultPlacementFront],
        back: [defaultPlacementBack],
      });
      setCustomization({
        ...customization,
        print_location_1: defaultPlacementFront?.code,
        print_placement_1: defaultPlacementFront,
      });
    }

    fetchAllPlacements();
  }, [product?.productType]);

  useEffect(() => {
    const productType = product?.productType || "Shirt";
    const warehouse = getMetaValue(product, "warehouse") || "monster";

    if (activePlacements.length && productType) {
      const filteredPlacements = filterPlacements(
        activePlacements,
        productType,
        warehouse
      );
      setPlacements(filteredPlacements);
    }
  }, [activePlacements, product]);

  useEffect(() => {
    if (product?.handle) {
      let _notForSale = getMetaValue(product, "not_for_sale") == "true";
      let _disableLogo = getMetaValue(product, "disable_logo") == "true";
      let _isEnterprise = getMetaValue(product, "is_enterprise") == "true";
      let _disablePlacement =
        getMetaValue(product, "disable_placement") == "true";
      setNotForSale(_notForSale);
      setDisableLogo(_disableLogo);
      setIsEnterprise(_isEnterprise);
      setDisablePlacement(_disablePlacement);
    }
  }, [product?.handle]);

  useEffect(() => {
    // Reset the selected options values when the product changes
    setSelectedOptions({});
    if (product?.id) {
      trackProductViewed(product);
    }
  }, [product?.id]);

  // These UseEffects were added for testing purposues
  useEffect(() => {
    console.log("print_url_1_stakes", customization?.print_url_1_stakes);
  }, [customization?.print_url_1_stakes]);

  useEffect(() => {
    console.log("print_url_2_stakes", customization?.print_url_2_stakes);
  }, [customization?.print_url_2_stakes]);

  return (
    <>
      <Container maxWidth="lg" sx={sx.container}>
        <Box sx={sx.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              <ProductImages
                images={images}
                handleClick={handleImageClick}
                zoom={zoom}
                handleClose={handleClose}
              />
              {!isEnterprise && (
                <Box sx={sx.contactSupportLabel}>
                  <ProductContactSupport />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              <ProductDetails
                loading={loading}
                product={product}
                variant={variant}
                activeColor={activeColor}
                selectedOptions={selectedOptions}
                handleColorClick={handleColorClick}
                handleOptionChange={handleOptionChange}
              />
              {!isEnterprise && !notForSale && (
                <>
                  <ProductCustomize
                    product={product}
                    handleClick={handlePlacementClick}
                    activeImage={activeImage}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                    handleUpload={handleUpload}
                    handlePreviewClick={handlePreviewClick}
                  />
                  <ProductAddToCart
                    loading={loading}
                    product={product}
                    variant={variant}
                    addToCartDisabled={addToCartDisabled}
                  />
                  <ProductEnquireBulkDiscount
                    handleButtonClick={() => handleOpenContactModal("Enquire for Bulk Discount")}
                  />
                </>
              )}
              {isEnterprise && (
                <Box mt={8}>
                  <Button
                    fullWidth
                    color="secondary"
                    onClick={() => handleOpenContactModal("Enquire for Enterprise Products")}
                    variant="contained"
                  >
                    Contact Us Now
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box mt={4} />
              <ProductTabs
                product={product}
                disableShipping={disableShipping}
                disableFileGuidelines={disableFileGuidelines}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductsYouMayAlsoLike
                products={recommendedProducts}
                productUrl={productUrl}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <PlacementModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        frontOrBack={frontOrBack}
        activePlacement={activePlacement[frontOrBack]}
        handleClick={handleSelectPlacement}
        placements={placements}
      />
      <ContactModal
        title={contactModalTitle}
        submitCTAText="Enquire Now"
        open={openContactModal}
        handleClose={() => setOpenContactModal(false)}
        handleConfirm={handleContactSubmit}
        loading={emailLoading}
        errors={errors}
      />
    </>
  );
};

export default Product;

const sx = {
  root: {
    py: 4,
  },
  container: {
    pt: 3,
  },
  title: {
    my: 2,
  },
  contactSupportLabel: {
    ml: {
      xs: 0,
      sm: "124px"
    }
  }
};
