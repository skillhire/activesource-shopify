import React, { useEffect } from "react";
import { Box, List } from "@mui/material";
import { OrderItem } from "components";
import { useAuth, useOrders } from "hooks";
import { getCookie } from "cookies-next";

const OrderList = () => {
  const { accessToken } = useAuth();

  const { orders, fetchCustomerOrders } = useOrders();

  const handleClick = (order) => {
    window.open(order?.statusUrl, "_blank");
  };

  useEffect(() => {
    if (accessToken) {
      fetchCustomerOrders(accessToken);
    }
  }, [accessToken]);

  return (
    <Box>
      <List>
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} handleClick={handleClick} />
        ))}
      </List>
    </Box>
  );
};

export default OrderList;
