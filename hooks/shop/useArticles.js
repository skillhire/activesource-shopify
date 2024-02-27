import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  QUERY_ARTICLE_BY_HANDLE,
  QUERY_ARTICLES,
} from "graphql/shopify/articles";

const useArticles = (props) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [article, setArticle] = useState();
  const [articles, setArticles] = useState();

  const [fetchArticleQuery, fetchArticleResp] = useLazyQuery(
    QUERY_ARTICLE_BY_HANDLE
  );

  const [fetchArticlesQuery, fetchArticlesResp] = useLazyQuery(QUERY_ARTICLES);

  const fetchArticle = (blogHandle, articleHandle, perPage = 250) => {
    fetchArticleQuery({
      variables: {
        blogHandle: blogHandle,
        articleHandle: articleHandle,
        first: perPage,
      },
    });
  };

  const fetchArticles = (perPage = 250) => {
    fetchArticlesQuery({
      variables: {
        first: perPage,
      },
    });
  };

  useEffect(() => {
    if (fetchArticleResp?.data) {
      setArticle(fetchArticleResp?.data?.blog?.articleByHandle);
    }
  }, [fetchArticleResp?.data]);

  useEffect(() => {
    if (fetchArticlesResp?.data) {
      setArticles(fetchArticlesResp?.data?.articles?.edges.map((e) => e.node));
    }
  }, [fetchArticlesResp?.data]);

  useEffect(() => {
    setError(fetchArticleResp?.error || fetchArticlesResp?.error);
  }, [fetchArticleResp?.error, fetchArticlesResp?.error]);

  useEffect(() => {
    setLoading(fetchArticleResp?.loading || fetchArticlesResp?.loading);
  }, [fetchArticleResp?.loading, fetchArticlesResp?.loading]);

  return {
    article,
    articles,
    fetchArticle,
    fetchArticles,
    loading,
    error,
  };
};

export default useArticles;
