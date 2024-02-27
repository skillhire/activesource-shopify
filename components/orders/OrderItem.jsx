import React from "react";
import { Link, Stack, TableRow, TableCell, Typography } from "@mui/material";
import Image from "next/image";
import moment from "moment";

const OrderItem = ({ styles, order, handleClick, ...props }) => {
  const products = order?.lineItems?.edges;
  return products.map((product) => (
    <TableRow key={product.node?.title}>
      <TableCell>
        <Stack direction="row" alignItems="center">
          <Image
            alt={order?.name}
            height={62}
            width={62}
            src={product.node?.variant?.image?.url}
            style={sx.image}
          />
          <Typography variant="subtitle1">{product.node?.title}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{order.name}</TableCell>
      <TableCell>
        <Typography variant="body2">
          {moment(order?.processedAt).format("MM/DD/YYYY")}
        </Typography>
      </TableCell>
      <TableCell>
        <Link href={order.statusUrl} variant="link" target="_blank">
          <Typography variant="body2">View Order Status</Typography>
        </Link>
      </TableCell>
    </TableRow>
  ));
};

export default OrderItem;

const sx = {
  image: { objectFit: "contain" },
};
