import React, { useEffect, useCallback } from "react";
import {
  Box,
  Stack,
  Paper,
  Button,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { SHOP_ALL_URL } from "constants/navigation";

import { OrderItem } from "components";
import { useAuth, useOrders } from "hooks";

const OrderList = () => {
  const { accessToken } = useAuth();

  const { orders, loading, fetchCustomerOrders } = useOrders();

  const handleClick = () => router.push(SHOP_ALL_URL);

  const handleOrderClick = (order) => {
    window.open(order?.statusUrl, "_blank");
  };

  useEffect(() => {
    if (accessToken) {
      fetchCustomerOrders(accessToken);
    }
  }, [accessToken]);

  const renderContent = useCallback(() => {
    if (orders?.length > 0) {
      return (
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body2">Product</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Order Number</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Date</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                handleClick={handleOrderClick}
              />
            ))}
          </TableBody>
        </Table>
      );
    }
    return (
      <Stack sx={sx.emptyMessage} spacing={2}>
        <Typography variant="h4">You have no orders yet</Typography>
        <Typography variant="body1">
          Start making your own personalized collections
        </Typography>
        <Box pt={5}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={sx.button}
            onClick={handleClick}
          >
            Explore Products
          </Button>
        </Box>
      </Stack>
    );
  }, [orders]);

  return (
    <Box>
      <TableContainer component={Paper} sx={sx.container}>
        {loading && (
          <Box sx={{ ...sx.container, ...sx.loader }}>
            <CircularProgress color="primary" />
          </Box>
        )}
        {!loading && renderContent()}
      </TableContainer>
    </Box>
  );
};

const sx = {
  container: {
    minHeight: 380,
  },
  emptyMessage: {
    padding: 12,
    alignItems: "center",
  },
  loader: {
    flex: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default OrderList;
