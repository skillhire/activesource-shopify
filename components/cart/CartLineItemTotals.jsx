import React from "react";
import { useCheckout } from "hooks";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { formatCurrency } from "utils";
import { CartLineItemPrice } from "components";

const CartLineItemTotals = ({ styles }) => {
  const { checkout } = useCheckout();

  return (
    <Box width="100%" sx={sx.root}>
      {checkout && (
        <Box>
          <CartLineItemPrice
            label={"Subtotal"}
            value={formatCurrency(checkout.lineItemsSubtotalPrice?.amount)}
          />
          <Typography variant="body2" sx={sx.note}>
            Taxes and shipping calculated at checkout
          </Typography>
        </Box>
      )}
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
  note: {
    textAlign: "right",
  },
};
