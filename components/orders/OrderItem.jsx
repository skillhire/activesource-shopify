import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Image } from "components";
import { formatCurrency } from "utils";
import moment from "moment";

const OrderItem = ({ styles, order, handleClick, ...props }) => {
  return (
    <ListItem>
      <ListItemButton onClick={() => handleClick(order)}>
        <ListItemIcon sx={sx.thumbnail}>
          <Image
            alt={order?.name}
            height={160}
            width={160}
            layout="responsive"
            src={order?.lineItems?.edges[0]?.node?.variant?.image?.src}
            style={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={order?.name}
          secondary={
            <Typography gutterBottom variant="body2" color="textSecondary">
              {moment(order?.processedAt).format("MM/DD/YYYY")} |{" "}
              {formatCurrency(order?.totalPrice?.amount)}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default OrderItem;

const sx = {
  root: {},
  button: {
    p: 0,
  },
  thumbnail: {
    mr: 2,
  },
};
