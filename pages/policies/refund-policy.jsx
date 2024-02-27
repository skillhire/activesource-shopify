import React, { useEffect } from "react";
import { Layout, Page } from "components";
import { useShop } from "hooks";

const RefundPolicy = () => {
  const { shop } = useShop();

  useEffect(() => {
    if (!shop) {
      fetchShop();
    }
  }, [shop]);

  return (
    <Layout>
      <Page
        html
        title={shop?.refundPolicy?.title}
        body={shop?.refundPolicy?.body}
      />
    </Layout>
  );
};

export default RefundPolicy;
