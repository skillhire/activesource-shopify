import React, { useState, useEffect } from "react";
import { usePages } from "hooks";
import { Page, Layout } from "components";
import { useRouter } from "next/router";
import SectionContactUs from "sections/pages/SectionContactUs";

const ShopifyPage = (props) => {
  const router = useRouter();
  const { handle } = router.query;

  const { page, fetchPage } = usePages();

  useEffect(() => {
    if (handle) {
      fetchPage(handle);
    }
  }, [handle]);

  return (
    <Layout>
      <Page html title={page?.title} body={page?.body} image={page?.image} />
      <SectionContactUs />
    </Layout>
  );
};

export default ShopifyPage;
