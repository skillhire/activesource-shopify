import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_PAGE_BY_HANDLE } from "graphql/shopify/pages";

const usePages = () => {
  const [page, setPage] = useState();
  const [fetchPageQuery, { data, loading, error }] =
    useLazyQuery(QUERY_PAGE_BY_HANDLE);

  const fetchPage = async (handle) => {
    let resp = await fetchPageQuery({
      variables: {
        handle: handle,
      },
    });
    return resp?.data?.pageByHandle;
  };

  useEffect(() => {
    if (data) {
      let image = data?.pageByHandle?.metafields?.find(
        (m) => m?.key === "image"
      )?.reference?.image?.url;

      let formattedPage = {
        title: data?.pageByHandle?.title,
        body: data?.pageByHandle?.body,
        handle: data?.pageByHandle?.handle,
        image: image,
      };
      setPage(formattedPage);
    }
  }, [data]);

  return {
    loading,
    error,
    page,
    fetchPage,
  };
};

export default usePages;
