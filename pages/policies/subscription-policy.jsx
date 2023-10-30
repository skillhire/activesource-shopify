import React from "react";
import { Layout, Page } from "components";
import { useShop } from "hooks";

const SubscriptionPolicy = () => {
  const { shop } = useShop();

  return (
    <Layout>
      <Page
        html
        title={shop?.subscriptionPolicy?.title}
        body={shop?.subscriptionPolicy?.body}
      />
    </Layout>
  );
};

export default SubscriptionPolicy;
