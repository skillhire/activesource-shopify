import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "utils";
import { AddToCartButton, VariantSelector } from "components";
import CustomColorSelect from "components/variants/CustomColorSelect";
import CustomizeButton from "components/cart/CustomizeButton";
import QuantitySelector from "components/variants/QuantitySelector";

const ProductDetails = ({
  product,
  variant,

  selectedOptions,
  handleOptionChange,

  customAttributes,
  handleColorClick,
  handleCustomizeClick,
}) => {
  const [addToCartDisabled, setAddToCartDisabled] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { priceRange } = product || {};
  const { minVariantPrice } = priceRange || {};

  const [price, setPrice] = useState();
  const [colors, setColors] = useState([]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  useEffect(() => {
    if (variant) {
      setPrice(variant?.price?.amount);
    } else {
      setPrice(minVariantPrice?.amount);
    }
  }, [variant, minVariantPrice]);

  const handleAddToCartDisabled = () => {
    const disabled = !variant || Object.keys(customAttributes).length < 0;
    setAddToCartDisabled(disabled);
  };

  useEffect(() => {
    handleAddToCartDisabled();
  }, [product, customAttributes, selectedOptions]);

  useEffect(() => {
    if (product?.metafields?.length > 0) {
      let _colors = product.metafields
        .find((metafield) => metafield.key === "colors")
        .references.edges.map((e) => e.node);
      setColors(_colors);
    }
  }, [product]);

  return (
    <Box sx={sx.root}>
      <Stack spacing={2}>
        {product && (
          <>
            <Box sx={sx.title}>
              <Typography variant="h5">{product?.title}</Typography>
              <Typography variant="button" sx={sx.price}>
                {formatCurrency(price)}
              </Typography>
            </Box>
            <VariantSelector
              handleChange={handleOptionChange}
              selectedOptions={selectedOptions}
              options={product?.options}
            />
            <CustomColorSelect
              colors={colors}
              handleClick={handleColorClick}
              customAttributes={customAttributes}
            />
          </>
        )}
        <QuantitySelector
          quantity={quantity}
          handleChange={handleQuantityChange}
        />
        <AddToCartButton
          disabled={addToCartDisabled}
          quantity={quantity}
          variant={variant}
          product={product}
          customAttributes={customAttributes}
        />
        <CustomizeButton
          disabled={customAttributes?.color == undefined}
          handleClick={handleCustomizeClick}
        />
      </Stack>
    </Box>
  );
};

export default ProductDetails;

const sx = {
  root: {
    p: 2,
  },
  detailsContainer: {
    px: {
      xs: 2,
      sm: 9,
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  compareAtPrice: {
    textDecoration: "line-through",
    color: "text.secondary",
  },
  addToCart: {
    display: "flex",
    justifyContent: {
      xs: "center",
      sm: "flex-start",
    },
    width: {
      xs: "100%",
      sm: "auto",
    },
    backgroundColor: {
      sm: "transparent",
    },
  },
};
