import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { formatCurrency } from "utils";
import Image from "next/image";

const OrderLineItem = ({ styles, lineItem, ...props }) => {
  return (
    <ListItem disableGutters>
      <ListItemIcon sx={sx.thumbnail}>
        {lineItem?.variant?.image?.src && (
          <Badge badgeContent={lineItem.quantity} color="primary">
            <Image
              responsive
              height={100}
              width={100}
              style={{
                objectFit: "contain",
              }}
              src={lineItem?.variant?.image?.src}
            />
          </Badge>
        )}
      </ListItemIcon>
      <ListItemText
        primary={lineItem.title}
        secondary={
          <span>
            <Typography variant="body1" color="textPrimary">
              {lineItem?.variant?.title}
            </Typography>
            <Typography variant="body1" color="textPrimary">
              {lineItem.quantity} x {formatCurrency(lineItem?.variant?.price)}
            </Typography>
          </span>
        }
      />
    </ListItem>
  );
};

OrderLineItem.propTypes = {
  styles: PropTypes.object,
  lineItem: PropTypes.object.isRequired,
};

export default OrderLineItem;

const sx = {
  root: {},
  thumbnail: {
    mr: 2,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  thumbnail: {
    mr: 2,
  },
  lineItem: {},
  loader: {},
  removeIcon: {
    fontSize: 20,
    color: "text.secondary",
  },
};
