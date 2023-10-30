import React, { useState } from "react";
import { useCheckout, useSegment } from "hooks";
import PropTypes from "prop-types";
import { Box, Button, CircularProgress } from "@mui/material";

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
        color="primary"
        onClick={handleCheckoutClick}
        variant="contained"
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} sx={sx.loader} /> : "Checkout"}
      </Button>
    </Box>
  );
};

CheckoutButton.propTypes = {
  variant: PropTypes.object,
  quantity: PropTypes.number,
  isAvailable: PropTypes.bool,
  className: PropTypes.string,
};

export default CheckoutButton;

const sx = {
  root: {},
  loader: {
    color: "common.white",
  },
};
