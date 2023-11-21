import React, { useState, useEffect } from "react";
import { Grid, Box, Stack, Typography } from "@mui/material";

import { formatPriceRange } from "utils";
import { AddToCartButton, VariantSelector } from "components";
import CustomColorSelect from "components/variants/CustomColorSelect";
import QuantitySelector from "components/variants/QuantitySelector";

const ProductDetails = ({
  children,
  product,
  variant,
  selectedOptions,
  handleOptionChange,
  customAttributes,
  handleColorClick,
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
        .find((metafield) => metafield?.key === "colors")
        ?.references.edges.map((e) => e.node);
      setColors(_colors);
    }
  }, [product]);

  return (
    <Box sx={sx.root}>
      <Stack spacing={2}>
        {product && (
          <>
            <Typography variant="h4">{product?.title}</Typography>
            <Typography variant="button" sx={sx.price}>
              {formatPriceRange(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.maxVariantPrice.amount
              )}
            </Typography>
            <CustomColorSelect
              colors={colors}
              handleClick={handleColorClick}
              customAttributes={customAttributes}
            />
            <VariantSelector
              handleChange={handleOptionChange}
              selectedOptions={selectedOptions}
              options={product?.options}
              showGuidelines={customAttributes?.color !== undefined}
            />
          </>
        )}
        <Grid container>
          <Grid item xs={5}>
            <QuantitySelector
              quantity={quantity}
              handleChange={handleQuantityChange}
            />
          </Grid>
          <Grid item xs={7}>
            <AddToCartButton
              disabled={addToCartDisabled}
              quantity={quantity}
              variant={variant}
              product={product}
              customAttributes={customAttributes}
            />
          </Grid>
        </Grid>
        {children}
      </Stack>
    </Box>
  );
};

export default ProductDetails;

const sx = {
  root: { px: 2 },
};
