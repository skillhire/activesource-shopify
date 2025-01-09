import React, { useMemo, useCallback } from "react";
import { useCart } from "hooks";
import { Box, List, Typography, CircularProgress } from "@mui/material";

import { CartLineItem } from "components";

const CartLineItems = ({ styles }) => {
  const { cart, loading } = useCart();

  return (
    <List sx={{ ...sx.root, ...styles }} disablePadding>
      {loading && (
        <Box sx={sx.loader}>
          <CircularProgress color="primary" />
        </Box>
      )}
      { cart?.lines?.edges?.length > 0 && 
        cart?.lines?.edges?.map(({ node }) => (
        <CartLineItem 
          key={node.id} 
          lineItem={node}           
        />
      ))}
      { cart?.lines?.edges?.length === 0 && (
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
  loader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
