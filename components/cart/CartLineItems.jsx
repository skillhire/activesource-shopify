import React from "react";
import { useCheckout } from "hooks";
import { Box, List, Typography, CircularProgress } from "@mui/material";

import { CartLineItem } from "components";

const CartLineItems = ({ styles }) => {
  const { checkout, loading } = useCheckout();

  const lineItems = checkout?.lineItems?.edges.map((e) => e.node) || [];

  const renderContent = () => {
    if (lineItems?.length > 0) {
      return (
        <>
          {lineItems.map((lineItem) => (<CartLineItem lineItem={lineItem} key={lineItem.id} />))}
        </>
      )
    }
    return (
      <Box sx={sx.empty}>
        <Typography variant="body1">Your cart is empty</Typography>
      </Box>
    )
  }

  return (
    <List sx={{ ...sx.root, ...styles }} disablePadding>
      {loading && (
        <Box sx={sx.loader}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {!loading && renderContent()}
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
  }
};
