import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CUSTOMER_ORDERS } from "graphql/shopify/customers";

const useOrders = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [order, setOrder] = useState();
  const [orders, setOrders] = useState();

  const [fetchCustomerOrdersQuery, fetchCustomerOrdersResp] = useLazyQuery(
    QUERY_CUSTOMER_ORDERS
  );

  const fetchCustomerOrder = async (accessToken, orderId) => {
    let data = await fetchCustomerOrders(accessToken, 1, null, `id:${orderId}`);
    setOrder(data.customer.orders?.edges[0]?.node);
  };

  const fetchCustomerOrders = async (
    customerAccessToken,
    first = 20,
    cursor = null,
    query = null
  ) => {
    let resp = await fetchCustomerOrdersQuery({
      variables: {
        customerAccessToken,
        first,
        cursor,
        query,
      },
    });
    return resp?.data;
  };

  useEffect(() => {
    if (fetchCustomerOrdersResp?.data) {
      setOrders(
        fetchCustomerOrdersResp?.data?.customer?.orders?.edges.map(
          (e) => e.node
        )
      );
    }
  }, [fetchCustomerOrdersResp?.data]);

  useEffect(() => {
    setError(fetchCustomerOrdersResp?.error);
  }, [fetchCustomerOrdersResp?.error]);

  useEffect(() => {
    setLoading(fetchCustomerOrdersResp?.loading);
  }, [fetchCustomerOrdersResp?.loading]);

  return {
    loading,
    error,
    order,
    orders,
    fetchCustomerOrder,
    fetchCustomerOrders,
  };
};

export default useOrders;
