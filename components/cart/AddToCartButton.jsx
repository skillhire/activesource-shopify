import React, { useContext } from "react";
import { useCheckout, useAlerts, useSegment } from "hooks";
import { Button, CircularProgress } from "@mui/material";
import { CustomizeContext, ShopContext } from "context";

const AddToCartButton = ({
  disabled,
  styles,
  variant,
  product,
  quantity,
  customAttributes, // customAttributes={key: value}
  ...props
}) => {
  const { trackAddToCart } = useSegment();

  const { showAlertError } = useAlerts();
  const { toggleCart } = useContext(ShopContext);
  const { createBitlyLink } = useContext(CustomizeContext);
  const { loading, checkoutLineItemAdd } = useCheckout();

  const handleAddToCart = async () => {
    if (disabled) showAlertError("Please select all options");
    if (!disabled && variant?.id) {
      let lineItem = {
        variantId: variant?.id,
        quantity: quantity,
      };

      let url = await createBitlyLink()
      

      lineItem = {
        ...lineItem,
        customAttributes: [
          {
            key: "url",
            value: url,
          },
        ],
      }
      checkoutLineItemAdd(lineItem)
      trackAddToCart({
        quantity: quantity,
        variant: variant,
        product: product,
      })
      setTimeout(() => toggleCart(), 500)
    }
  };

  return (
    <Button
      fullWidth
      color="secondary"
      onClick={handleAddToCart}
      disabled={disabled}
      sx={{ ...sx.root, ...styles }}
      variant="contained"
      startIcon={loading && <CircularProgress size={20} sx={sx.loader} />}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;

const sx = {
  root: {
    minWidth: 160,
    whiteSpace: "nowrap",
  },
  loader: {
    color: "common.white",
  },
};
