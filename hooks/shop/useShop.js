import React, { useContext, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP } from "graphql/shopify/shop";
import { ShopContext } from "context";

const useShop = () => {
  const { shop, setShop } = useContext(ShopContext);

  const [logo, setLogo] = useState();
  const [fetchShopQuery, { data, loading, error }] = useLazyQuery(QUERY_SHOP);

  const fetchShop = async () => {
    let resp = await fetchShopQuery();
    return resp?.data?.shop;
  };

  useEffect(() => {
    if (data) {
      setShop(data.shop);
      setLogo(data.shop.brand?.logo?.image);
    }
  }, [data]);

  return {
    loading,
    error,
    shop,
    logo,
    fetchShop,
  };
};

export default useShop;
