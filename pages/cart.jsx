import { Box, Grid, Typography } from "@mui/material";
import {
  Layout,
  CartLineItems,
  CartLineItemTotals,
  CheckoutButton,
  CartApplyDiscountCode,
} from "components";

const Cart = ({ styles, title = "Your Shopping Bag", ...props }) => {
  return (
    <Layout maxWidth="md">
      <Box px={2} sx={{ ...sx.root, ...styles }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" sx={sx.title}>
              {title}
            </Typography>
            <CartLineItems />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CartApplyDiscountCode />
            <CartLineItemTotals />
            <CheckoutButton />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Cart;

const sx = {
  root: {},
  backButton: {
    my: 2,
  },
  title: {
    m: 0,
  },
};
