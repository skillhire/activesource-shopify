import React, { useState } from "react";
import { useCart, useSegment } from "hooks";
import { Box, Button, CircularProgress } from "@mui/material";

const CheckoutButton = ({ styles, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { cart } = useCart();

  const { trackCheckoutStarted } = useSegment();

  const handleCheckoutClick = () => {
    setLoading(true);
    setTimeout(() => redirectToWebUrl(), 500);
  };

  const redirectToWebUrl = () => {
    trackCheckoutStarted(cart);
    window.location = cart.checkoutUrl;
    setLoading(false);
  };

  return (
    <Box sx={sx.root}>
      <Button
        fullWidth
        sx={sx.button}
        color="secondary"
        onClick={handleCheckoutClick}
        variant="contained"
        disabled={loading}
        size="large"
        startIcon={loading && <CircularProgress size={20} sx={sx.loader} />}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default CheckoutButton;

const sx = {
  root: {},
  button: {
    color: 'common.white',
  },
  loader: {
    color: "common.white",
  },
  caption: {
    textAlign: "center",
  },
};
