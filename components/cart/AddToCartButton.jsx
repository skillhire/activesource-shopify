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
  const { customization } = useContext(CustomizeContext);
  const { loading, checkoutLineItemAdd } = useCheckout();

  const handleAddToCart = async () => {
    if (disabled){
      showAlertError("Please select all options");
      return;
    }
    let customAttributes = [
      {key: "_print_sku", value: variant?.sku },
    ]
    if(customization?.print_preview_1){
      customAttributes = [
        ...customAttributes,          
        {key: "_print_type_1", value: customization?.print_type_1},
        {key: "_print_url_1", value: customization?.print_url_1},
        {key: "_print_location_1", value: customization?.print_location_1},
        {key: "_print_preview_1", value: customization?.print_preview_1},
        {key: "_file_extension_1", value: customization?.file_extension_1},
      ]
    }
    if(customization?.print_preview_2){
      customAttributes = [
        ...customAttributes,          
        {key: "_print_type_2", value: customization?.print_type_2},
        {key: "_print_url_2", value: customization?.print_url_2},
        {key: "_print_location_2", value: customization?.print_location_2},
        {key: "_print_preview_2", value: customization?.print_preview_2},
        {key: "_file_extension_2", value: customization?.file_extension_2},
      ]
    }
  
    if (!disabled && variant?.id) {
      let lineItem = {
        variantId: variant?.id,
        quantity: quantity,
        customAttributes: customAttributes,        
      };                    
      checkoutLineItemAdd(lineItem);
      trackAddToCart({
        quantity: quantity,
        variant: variant,
        product: product,
      });
      setTimeout(() => toggleCart(), 500);
    }
  };

  return (
    <Button
      fullWidth
      color="secondary"
      onClick={handleAddToCart}
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
