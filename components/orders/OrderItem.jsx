import React from "react";
import PropTypes from "prop-types";
import { Button, Box, Typography } from "@mui/material";
import { Image } from "components";
import { formatCurrency } from "utils";
import moment from "moment";

const OrderItem = ({ styles, order, handleClick, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Button sx={sx.button} onClick={() => handleClick(order)}>
        <Image
          alt={order?.name}
          fill
          src={order?.lineItems?.edges[0]?.node?.variant?.image?.src}
        />
      </Button>
      <Box py={1} px={1}>
        <Typography gutterBottom variant="subtitle1" component="h2">
          {order?.name}
        </Typography>
        <Box display="flex" flexGrow={1} justifyContent="space-between">
          <Typography gutterBottom variant="body2" color="textSecondary">
            {moment(order?.processedAt).format("MM/DD/YYYY")}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">
            {formatCurrency(order?.totalPrice)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderItem;

OrderItem.propTypes = {
  styles: PropTypes.object,
  order: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const sx = {
  root: {},
  button: {
    p: 0,
  },
};
