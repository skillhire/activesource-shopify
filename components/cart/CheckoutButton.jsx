import React, { useState } from "react";
import { useCheckout, useSegment } from "hooks";
import PropTypes from "prop-types";
import { Typography, Box, Button, CircularProgress } from "@mui/material";

const CheckoutButton = ({ styles, ...props }) => {
  const [loading, setLoading] = useState(false);
  const { checkout } = useCheckout();

  const { trackCheckoutStarted } = useSegment();

  const handleCheckoutClick = () => {
    setLoading(true);
    setTimeout(() => redirectToWebUrl(), 500);
  };

  const redirectToWebUrl = () => {
    trackCheckoutStarted(checkout);
    window.location = checkout.webUrl;
    setLoading(false);
  };

  return (
    <Box sx={sx.root}>
      <Button
        fullWidth
        color="secondary"
        onClick={handleCheckoutClick}
        variant="contained"
        disabled={loading}
        size="large"
      >
        {loading ? <CircularProgress size={20} sx={sx.loader} /> : "Checkout"}
      </Button>
    </Box>
  );
};

export default CheckoutButton;

const sx = {
  root: {},
  loader: {
    color: "common.white",
  },
  caption: {
    textAlign: 'center'
  }
};
