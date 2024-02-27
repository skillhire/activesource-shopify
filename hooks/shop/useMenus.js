import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_MENU_BY_HANDLE } from "graphql/shopify/menus";

const useMenus = () => {
  const [menu, setMenu] = useState();
  const [fetchMenuQuery, { data, loading, error }] =
    useLazyQuery(QUERY_MENU_BY_HANDLE);

  const fetchMenu = async (handle) => {
    let resp = await fetchMenuQuery({
      variables: {
        handle,
      },
    });
    return resp?.data?.menu;
  };

  useEffect(() => {
    if (data) {
      setMenu(data.menu);
    }
  }, [data]);

  return {
    loading,
    error,
    menu,
    fetchMenu,
  };
};

export default useMenus;
