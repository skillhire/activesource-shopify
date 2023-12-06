import React from "react";
import { AccountLayout, OrderList } from "components";

const MyOrders = () => {
  return (
    <AccountLayout title="Order History">
      <OrderList />
    </AccountLayout>
  );
};

export default MyOrders;