import React from "react";
import { OrderList } from "components";
import { Container, Typography } from "@mui/material";
import { Layout } from "components";

const CustomerOrders = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={sx.root}>
        <Typography variant="h3" mb={6}>Order History</Typography>
        <OrderList />
      </Container>
    </Layout>
  );
};

export default CustomerOrders;

const sx = {
  root: {
    py: 12,
    textAlign: "center",
  },
};
