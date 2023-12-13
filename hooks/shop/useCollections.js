import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  QUERY_COLLECTION,
  QUERY_COLLECTIONS,
} from "graphql/shopify/collections";
import { PER_PAGE } from "constants/shop";

const useCollections = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [image, setImage] = useState();
  const [cursor, setCursor] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [products, setProducts] = useState();
  const [collection, setCollection] = useState();
  const [collections, setCollections] = useState();

  const [fetchCollectionQuery, fetchCollectionResp] =
    useLazyQuery(QUERY_COLLECTION);

  const [fetchCollectionsQuery, fetchCollectionsResp] =
    useLazyQuery(QUERY_COLLECTIONS);

  const fetchCollection = async (handle, query) => {
    const {
      first = PER_PAGE,
      filters,
      reverse = false,
      sortKey = "COLLECTION_DEFAULT",
      after,
    } = query || {};

    const resp = await fetchCollectionQuery({
      variables: {
        handle,
        first,
        filters,
        reverse,
        sortKey,
        after,
      },
    });

    setCollection(resp?.data?.collectionByHandle);
    setHasNextPage(
      resp?.data?.collectionByHandle?.products?.pageInfo?.hasNextPage
    );
    setCursor(resp?.data?.collectionByHandle?.products?.pageInfo?.endCursor);

    let collectionProducts =
      resp?.data?.collectionByHandle?.products?.edges?.map((e) => e.node);
    if (after) {
      setProducts([...products, ...collectionProducts]);
    } else {
      setProducts(collectionProducts);
    }
    setImage(resp?.data?.collectionByHandle?.image?.url);
  };

  const fetchCollections = async (perPage = PER_PAGE) => {
    let resp = await fetchCollectionsQuery({
      variables: {
        first: perPage,
      },
    });
    setCursor(resp?.data?.collections?.pageInfo?.endCursor);
    setHasNextPage(resp?.data?.collections?.pageInfo?.hasNextPage);
    setCollections(resp.data?.collections?.edges.map((e) => e.node));
  };

  useEffect(() => {
    setError(fetchCollectionResp?.error || fetchCollectionsResp?.error);
  }, [fetchCollectionResp?.error, fetchCollectionsResp?.error]);

  useEffect(() => {
    setLoading(fetchCollectionResp?.loading || fetchCollectionsResp?.loading);
  }, [fetchCollectionResp?.loading, fetchCollectionsResp?.loading]);

  return {
    cursor,
    hasNextPage,
    setHasNextPage,
    collection,
    collections,
    fetchCollection,
    fetchCollections,
    image,
    products,
    loading,
    error,
  };
};

export default useCollections;
