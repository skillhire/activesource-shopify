import React from "react";
import { useCheckout } from "hooks";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "utils";

const CartLineItemTotals = ({ styles }) => {
  const { checkout } = useCheckout();

  return (
    <Box width="100%" sx={sx.root}>
      <Stack direction="row" sx={sx.container}>
        <Typography variant="body1" sx={sx.label}>Total:</Typography>
        <>&nbsp;</>
        <Typography variant="body1">
          {checkout && formatCurrency(checkout.lineItemsSubtotalPrice?.amount)}
          {!checkout && "0"}
        </Typography>
      </Stack>
    </Box>
  );
};

CartLineItemTotals.propTypes = {
  styles: PropTypes.object,
};

export default CartLineItemTotals;

const sx = {
  root: {
    mt: 5,
    mb: 2,
  },
  container: {
    p: 2,
    justifyContent: "center",
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: "common.divider",
  },
  label: {
    fontWeight: 600,
  }
};
