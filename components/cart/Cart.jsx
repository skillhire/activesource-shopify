import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useSegment } from "hooks";
import { Box, Link, Drawer, IconButton, Typography } from "@mui/material";
import { ShopContext } from "context";
import { CartLineItems, CartLineItemTotals, CheckoutButton } from "components";
import { Close } from "@mui/icons-material";

const Cart = ({ styles }) => {
  const { trackCartViewed } = useSegment();
  const { checkout, cartOpen, toggleCart } = useContext(ShopContext);

  useEffect(() => {
    if (cartOpen && checkout) {
      trackCartViewed(checkout);
    }
  }, [cartOpen, checkout]);

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={toggleCart}
      transitionDuration={300}
      PaperProps={{ sx: sx.paper }}
    >
      <Box sx={{ ...sx.root, ...styles }}>
        <Box sx={sx.heading}>
          <IconButton onClick={toggleCart} sx={sx.closeButton}>
            <Close sx={sx.closeIcon} />
          </IconButton>
        </Box>
        <CartLineItems />
        <Box sx={sx.stickyPanel}>
          <CartLineItemTotals />
          <CheckoutButton />
          <Box sx={sx.disclaimers}>
            <Typography variant="caption" sx={sx.note}>
              Taxes and shipping calculated at checkout
            </Typography>
            <Typography variant="caption" sx={sx.note}>
              By proceeding to checkout, I acknowledge and agree to Active
              Source Lab's{" "}
              <Link href="/terms-of-service" target="_blank">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;

Cart.propTypes = {
  className: PropTypes.string,
};

const sx = {
  root: {
    flexGrow: {
      sm: 1,
      md: "auto",
    },
    width: {
      xs: "100vw",
      sm: 488,
    },
    px: {
      xs: 1,
      sm: 3,
    },
    py: 2,
  },
  paper: {
    backgroundColor: "common.white",
  },
  closeButton: { p: 0 },
  closeIcon: { color: "primary.main", width: 42, height: 42 },
  heading: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    mb: 5,
  },
  stickyPanel: {
    zIndex: 100,
    backgroundColor: "common.white",
    position: {
      xs: "fixed",
      sm: "static",
    },
    bottom: {
      xs: "0",
      sm: "unset",
    },
    pb: {
      xs: 4,
      sm: 0,
    },
    width: {
      xs: "calc(100% - 20px)",
      sm: "unset",
    },
  },
  disclaimers: {
    my: 2,
    gap: "5px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    width: "100%",
    textAlign: "center",
  },
};
