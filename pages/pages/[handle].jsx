import React, { useState, useEffect } from "react";
import { usePages } from "hooks";
import { Page, Layout } from "components";
import { useRouter } from "next/router";

const ShopifyPage = (props) => {
  const router = useRouter();
  const { handle } = router.query;

  const { page, fetchPage } = usePages();

  useEffect(() => {
    if (handle) {
      fetchPage(handle);
    }
  }, [handle]);

  useEffect(() => {
    console.log("Page", page);
  }, [page]);

  return (
    <Layout>
      <Page title={page?.title} body={page?.body} />
    </Layout>
  );
};

export default ShopifyPage;

const sx = {
  root: {
    my: 4,
  },
  title: {
    textAlign: "center",
  },
};
