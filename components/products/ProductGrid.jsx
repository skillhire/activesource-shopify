import PropTypes from "prop-types";
import { Grid, Typography, Stack } from "@mui/material";
import { ProductCard, ProductSkeleton } from "components";
import { useRouter } from "next/router";
import { useSegment } from "hooks";

const ProductGrid = ({
  products,
  loading,
  xs = 6,
  sm = 4,
  md = 3,
  lg = 3,
  xl = 3,
  ...props
}) => {
  const router = useRouter();
  const { trackProductClicked } = useSegment();

  const handleClick = (product) => {
    trackProductClicked(product);
    router.push(`/products/${product.handle}`);
  };

  return (
    <Stack alignItems="center" py={2}>
      <Grid container spacing={1}>
        {products && !loading && products.map((product) => (
          <Grid
            item
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            key={product.id}
          >
            <ProductCard product={product} handleClick={handleClick} />
          </Grid>
        ))}
        {products && loading && [...Array(12)].map((_, i) => (
          <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={i}>
            <ProductSkeleton />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const sx = {
  root: {},
};

ProductGrid.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default ProductGrid;
