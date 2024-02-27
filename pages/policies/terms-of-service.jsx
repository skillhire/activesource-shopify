import React, { useEffect } from "react";
import { Layout, Page } from "components";
import { useShop } from "hooks";

const TermsOfService = () => {
  const { shop, fetchShop } = useShop();

  useEffect(() => {
    if (!shop) {
      fetchShop();
    }
  }, [shop]);

  return (
    <Layout>
      <Page
        html
        title={shop?.termsOfService?.title}
        body={shop?.termsOfService?.body}
      />
    </Layout>
  );
};

export default TermsOfService;
