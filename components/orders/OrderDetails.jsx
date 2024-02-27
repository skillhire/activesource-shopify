import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { OrderLineItem, LineItemSkeleton } from "components";
import { formatCurrency } from "utils";
import moment from "moment";

const OrderDetails = ({ styles, order, ...props }) => {
  const [lineItems, setListItems] = useState();

  useEffect(() => {
    if (order) {
      setListItems(order?.lineItems?.edges.map((e) => e.node));
    }
  }, [order]);

  return (
    <Box sx={sx.root}>
      <Typography gutterBottom variant="caption" color="textSecondary">
        {moment(order?.processedAt).format("MMMM Do, YYYY")}
      </Typography>
      <Box mb={3}>
        <Typography gutterBottom variant="h5">
          Thank you for your purchase!
        </Typography>
        <Typography gutterBottom variant="body1">
          Your order details are below. If you have any questions, please don't
          hesitate to reach out to us.
        </Typography>
      </Box>
      <Typography gutterBottom variant="h5">
        Order Summary
      </Typography>
      <List>
        {lineItems
          ? lineItems.map((lineItem, i) => (
              <OrderLineItem key={i} lineItem={lineItem} />
            ))
          : [...Array(4)].map((_, i) => <LineItemSkeleton key={i} />)}
      </List>
      <Box py={1}>
        <Box sx={sx.lineItem}>
          <Typography variant="body1">Subtotal:</Typography>
          <Typography variant="body1">
            {formatCurrency(order?.subtotalPrice, 2)}
          </Typography>
        </Box>
        <Box sx={sx.lineItem}>
          <Typography variant="body1">Shipping:</Typography>
          <Typography variant="body1">
            {formatCurrency(order?.totalShippingPrice, 2)}
          </Typography>
        </Box>
        <Box sx={sx.lineItem}>
          <Typography variant="body1">Total:</Typography>
          <Typography variant="body1">
            {formatCurrency(order?.totalPrice, 2)}
          </Typography>
        </Box>
        <Typography gutterBottom variant="h5">
          Shipping Details
        </Typography>
        <Box sx={sx.shippingDetails}>
          <Typography variant="body1">
            {order?.shippingAddress?.firstName}{" "}
            {order?.shippingAddress?.lastName}
          </Typography>
          <Typography variant="body1">
            {order?.shippingAddress?.address1}
          </Typography>
          {order?.shippingAddress?.address2 && (
            <Typography variant="body1">
              {order?.shippingAddress?.address2}
            </Typography>
          )}
          <Typography variant="body1">
            {[
              order?.shippingAddress?.city,
              `${order?.shippingAddress?.province} ${order.shippingAddress?.zip}`,
            ].join(", ")}
          </Typography>
          <Typography variant="body1">
            {order?.shippingAddress?.country}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

OrderDetails.propTypes = {
  styles: PropTypes.object,
  order: PropTypes.object.isRequired,
};

export default OrderDetails;

const sx = {
  root: {},
  body1: {
    p: 0,
  },
  lineItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 1,
  },
  shippingDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    py: 1,
  },
};
