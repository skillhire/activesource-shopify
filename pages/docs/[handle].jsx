import React, { useEffect } from "react";
import { usePages } from "hooks";
import { SimplePage, Layout } from "components";
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

  return (
    <Layout>
      <SimplePage
        html
        title={page?.title}
        body={page?.body}
        image={page?.image}
      />
    </Layout>
  );
};

export default ShopifyPage;
