import { Grid, Box, CircularProgress, Stack } from "@mui/material";
import { ProductCard } from "components";

const ProductGrid = ({
  products,
  loading,
  xs = 6,
  sm = 4,
  md = 3,
  lg = 3,
  xl = 3,
  spacing = 1,
  productUrl,
  ...props
}) => {

  return (
    <Stack alignItems="center" py={2}>
      <Grid container spacing={1} {...props}>
        {!loading && products?.map((product) => (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={product.id}>
            <ProductCard product={product} productUrl={productUrl} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Box sx={sx.loading}>
          <CircularProgress disableShrink />
        </Box>
      )}
    </Stack>
  );
};

export default ProductGrid;

const sx = {
  root: {},
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
};
