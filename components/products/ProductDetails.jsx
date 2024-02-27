import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { formatPriceRange } from "utils";
import { VariantSelector } from "components";
import CustomColorSelect from "components/variants/CustomColorSelect";
import { getProductColors } from "utils";

const ProductDetails = ({
  product,
  variant,
  activeColor,
  selectedOptions,
  handleOptionChange,
  customAttributes,
  handleColorClick,
}) => {
  const { priceRange } = product || {};
  const { minVariantPrice } = priceRange || {};

  const [price, setPrice] = useState();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (variant) {
      setPrice(variant?.price?.amount);
    } else {
      setPrice(minVariantPrice?.amount);
    }
  }, [variant, minVariantPrice]);

  useEffect(() => {
    if (product?.metafields?.length > 0) {
      let formattedColors = getProductColors(product);      
      setColors(formattedColors);
    }
  }, [product]);

  return (
    <Stack spacing={2}>
      {product && (
        <>
          <Typography variant="h4">{product?.title}</Typography>
          <Typography variant="button">
            {formatPriceRange(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.maxVariantPrice.amount
            )}
          </Typography>
          <CustomColorSelect
            colors={colors}
            activeColor={activeColor}
            handleClick={handleColorClick}
            customAttributes={customAttributes}
          />
          <VariantSelector
            handleChange={handleOptionChange}
            selectedOptions={selectedOptions}
            options={product?.options}
          />
        </>
      )}
    </Stack>
  );
};

export default ProductDetails;
