import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_BLOG_BY_HANDLE, QUERY_BLOGS } from "graphql/shopify/blogs";

const useBlogs = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [articles, setArticles] = useState();
  const [blog, setBlog] = useState();
  const [blogs, setBlogs] = useState();

  const [fetchBlogQuery, fetchBlogResp] = useLazyQuery(QUERY_BLOG_BY_HANDLE);

  const [fetchBlogsQuery, fetchBlogsResp] = useLazyQuery(QUERY_BLOGS);

  const fetchBlog = (handle, perPage = 250) => {
    fetchBlogQuery({
      variables: {
        handle: handle,
        first: perPage,
      },
    });
  };

  const fetchBlogs = (perPage = 250) => {
    fetchBlogsQuery({
      variables: {
        first: perPage,
      },
    });
  };

  useEffect(() => {
    if (fetchBlogResp?.data) {
      setBlog(fetchBlogResp?.data?.blog);
      setArticles(
        fetchBlogResp?.data?.blog?.articles?.edges.map((e) => e.node)
      );
    }
  }, [fetchBlogResp?.data]);

  useEffect(() => {
    if (fetchBlogsResp?.data) {
      setBlogs(fetchBlogsResp?.data?.blogs?.edges.map((e) => e.node));
    }
  }, [fetchBlogsResp?.data]);

  useEffect(() => {
    setError(fetchBlogResp?.error || fetchBlogsResp?.error);
  }, [fetchBlogResp?.error, fetchBlogsResp?.error]);

  useEffect(() => {
    setLoading(fetchBlogResp?.loading || fetchBlogsResp?.loading);
  }, [fetchBlogResp?.loading, fetchBlogsResp?.loading]);

  return {
    articles,
    blog,
    blogs,
    fetchBlog,
    fetchBlogs,
    loading,
    error,
  };
};

export default useBlogs;
