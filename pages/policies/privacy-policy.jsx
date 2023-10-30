import React, { useEffect } from "react";
import { Layout, Page } from "components";
import { useShop } from "hooks";

const PrivacyPolicy = () => {
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
        title={shop?.privacyPolicy?.title}
        body={shop?.privacyPolicy?.body}
      />
    </Layout>
  );
};

export default PrivacyPolicy;
