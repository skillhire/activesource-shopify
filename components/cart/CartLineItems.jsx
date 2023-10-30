import React from "react";
import { useCheckout } from "hooks";
import { Box, List, Typography } from "@mui/material";
import { CartLineItem } from "components";

const CartLineItems = ({ styles, ...props }) => {
  const { checkout } = useCheckout();

  const lineItems = checkout?.lineItems?.edges.map((e) => e.node) || [];

  return (
    <List sx={{ ...sx.root, ...styles }} disablePadding>
      {lineItems?.length > 0 ? (
        lineItems.map((lineItem) => (
          <CartLineItem lineItem={lineItem} key={lineItem.id} />
        ))
      ) : (
        <Box sx={sx.empty}>
          <Typography variant="body1">Your cart is empty</Typography>
        </Box>
      )}
    </List>
  );
};

export default CartLineItems;

const sx = {
  root: {
    pb: {
      xs: 27.25, // account for fixed panel
      sm: 8.25,
    },
  },
  empty: {
    textAlign: "center",
  },
};
