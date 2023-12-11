import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useSegment } from "hooks";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
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
          <Typography variant="caption" sx={sx.note}>
            Taxes and shipping calculated at checkout
          </Typography>
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
      xs: "calc(100% - 64px)",
      sm: "unset",
    },
  },
  note: {
    my: 2,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
};
