import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useSegment } from "hooks";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { ShopContext } from "context";
import { CartLineItems, CartLineItemTotals, CheckoutButton } from "components";
import { ChevronLeft } from "lucide-react";

const Cart = ({ styles, title = "Your Cart" }) => {
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
          <IconButton size="small" onClick={toggleCart} sx={sx.close}>
            <ChevronLeft sx={sx.closeIcon} />
          </IconButton>
          <Box sx={sx.title}>
            <Typography variant="h5">{title}</Typography>
          </Box>
        </Box>
        <CartLineItems />
        <Box sx={sx.stickyPanel}>
          <CartLineItemTotals />
          <CheckoutButton />
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
      xs: 4,
      sm: 9,
    },
    py: 2,
  },
  paper: {
    backgroundColor: "common.white",
  },
  close: {
    position: "absolute",
    left: {
      xs: "unset",
      sm: 10,
    },
    right: {
      xs: 20,
      sm: "unset",
    },
  },
  closeIcon: {
    color: "primary.main",
  },
  heading: {
    display: "flex",
    alignItems: "flex-start",
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
      xs: "calc(100% - 64px)",
      sm: "unset",
    },
  },
};
