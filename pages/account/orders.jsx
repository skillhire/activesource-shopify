import React from "react";
import { OrderList } from "components";
import { Box, Container } from "@mui/material";
import { Layout } from "components";
import { useRouter } from "next/router";

const CustomerOrders = () => {
  return (
    <Layout>
      <Box sx={sx.root}>
        <Container maxWidth="sm">
          <OrderList />
        </Container>
      </Box>
    </Layout>
  );
};

export default CustomerOrders;

const sx = {
  root: {
    mt: 6,
  },
};
