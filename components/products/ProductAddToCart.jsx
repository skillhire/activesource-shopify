import React, { useState } from "react";
import { Stack } from "@mui/material";
import { AddToCartButton } from "components";
import QuantitySelector from "components/variants/QuantitySelector";

const ProductAddToCart = ({
  product,
  variant,
  customAttributes = {},
  addToCartDisabled,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <Stack spacing={1} direction="row">
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
    </Stack>
  );
};

export default ProductAddToCart;
