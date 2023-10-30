import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  QUERY_PRODUCT,
  QUERY_PRODUCTS,
  QUERY_PRODUCT_RECOMMENDATIONS,
  QUERY_PRODUCT_BY_ID,
} from "graphql/shopify/products";

const useProducts = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [cursor, setCursor] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [images, setImages] = useState();
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const [recommendedProducts, setRecommendedProducts] = useState();

  const [fetchProductQueryId, fetchProductIdResp] =
    useLazyQuery(QUERY_PRODUCT_BY_ID);

  const [fetchProductQuery, fetchProductResp] = useLazyQuery(QUERY_PRODUCT);

  const [fetchProductsQuery, fetchProductsResp] = useLazyQuery(QUERY_PRODUCTS);

  const [fetchProductRecommendationsQuery, fetchProductRecommendationsResp] =
    useLazyQuery(QUERY_PRODUCT_RECOMMENDATIONS);

  const fetchProduct = (handle) => {
    setProduct(null);
    fetchProductQuery({
      variables: { handle },
    });
  };

  const fetchProductById = (id) => {
    setProduct(null);
    fetchProductQueryId({
      variables: { id },
    });
  };

  const fetchProducts = async (productsQuery) => {
    const {
      query,
      first = 48,
      sortKey = "RELEVANCE",
      reverse = false,
      after,
    } = productsQuery || {};

    let resp = await fetchProductsQuery({
      variables: {
        query,
        first,
        sortKey,
        reverse,
        after,
      },
    });

    setHasNextPage(resp?.data?.products?.pageInfo?.hasNextPage);
    setCursor(resp?.data?.products?.pageInfo?.endCursor);
    let results = resp?.data?.products?.edges.map((e) => e.node);
    if (after) {
      setProducts([...products, ...results]);
    } else {
      setProducts(results);
    }
  };

  const fetchProductRecommendations = (productId) => {
    fetchProductRecommendationsQuery({
      variables: {
        productId,
      },
    });
  };

  useEffect(() => {
    if (fetchProductIdResp?.data) {
      setProduct(fetchProductIdResp?.data?.product);
      setImages(
        fetchProductIdResp?.data?.product?.images?.edges.map((e) => e.node)
      );
    }
  }, [fetchProductIdResp?.data]);

  useEffect(() => {
    if (fetchProductResp?.data) {
      setProduct(fetchProductResp?.data?.productByHandle);
      setRecommendedProducts(
        fetchProductResp?.data?.productByHandle?.metafields
          ?.find((metafield) => metafield?.key == "recommended_products")
          ?.references?.edges.map((e) => e.node)
      );
      setImages(
        fetchProductResp?.data?.productByHandle?.images?.edges.map(
          (e) => e.node
        )
      );
    }
  }, [fetchProductResp?.data]);

  useEffect(() => {
    if (fetchProductRecommendationsResp?.data) {
      setProducts(
        fetchProductRecommendationsResp?.data?.productRecommendations
      );
    }
  }, [fetchProductRecommendationsResp?.data]);

  useEffect(() => {
    setError(
      fetchProductResp?.error ||
        fetchProductsResp?.error ||
        fetchProductIdResp?.error ||
        fetchProductRecommendationsResp?.error
    );
  }, [
    fetchProductResp?.error,
    fetchProductsResp?.error,
    fetchProductIdResp?.error,
    fetchProductRecommendationsResp?.error,
  ]);

  useEffect(() => {
    setLoading(
      fetchProductResp?.loading ||
        fetchProductsResp?.loading ||
        fetchProductIdResp?.loading ||
        fetchProductRecommendationsResp?.loading
    );
  }, [
    fetchProductResp?.loading,
    fetchProductsResp?.loading,
    fetchProductIdResp?.loading,
    fetchProductRecommendationsResp?.loading,
  ]);

  return {
    hasNextPage,
    cursor,
    setCursor,
    images,
    product,
    products,
    recommendedProducts,
    setProduct,
    setProducts,
    fetchProduct,
    fetchProducts,
    fetchProductById,
    fetchProductRecommendations,
    loading,
    error,
  };
};

export default useProducts;
