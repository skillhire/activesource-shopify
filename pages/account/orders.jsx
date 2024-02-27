import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { LOGIN_URL } from "constants/navigation";
import { AccountLayout, OrderList } from "components";
import { useAuth, useAlerts } from "hooks";

const MyOrders = () => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { showAlertError } = useAlerts();

  if (!accessToken) {
    return null;
  }

  return (
    <AccountLayout title="Order History">
      <OrderList />
    </AccountLayout>
  );
};

export default MyOrders;
