import React from "react";
import { useResponsive, useSegment } from "hooks";
import { Box } from "@mui/material";
import { CarouselRightArrow, CarouselLeftArrow, ProductCard } from "components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CAROUSEL_RESPONSIVE } from "constants/shop";
import { useRouter } from "next/router";
import CarouselDot from "components/carousels/CarouselDot";
import { CircularProgress } from "@mui/material";

const ProductCarousel = ({
  products,
  centerMode = false,
  swipeable = true,
  draggable = true,
  autoPlay = false,
  responsive = CAROUSEL_RESPONSIVE,
  productUrl,
  styles,
}) => {
  const router = useRouter();
  const { trackProductClicked } = useSegment();

  const { isMobile } = useResponsive();

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      {products ? (
        <Carousel
          centerMode={centerMode}
          swipeable={swipeable}
          draggable={draggable}
          showDots={isMobile ? true : false}
          arrows={false}
          responsive={responsive}
          ssr
          infinite
          autoPlay={autoPlay}
          keyBoardControl
          customLeftArrow={<CarouselLeftArrow />}
          customRightArrow={<CarouselRightArrow />}
          customDot={<CarouselDot numItems={products?.length} />}
          partialVisible
        >
          {products.map((product) => (
            <Box sx={sx.item} key={product.id}>
              <ProductCard product={product} productUrl={productUrl} />
            </Box>
          ))}
        </Carousel>
      ) : (
        <Box sx={sx.loading}>
          <CircularProgress disableShrink />
        </Box>
      )}
    </Box>
  );
};

export default ProductCarousel;

const sx = {
  root: {},
  carousel: {
    width: "100%",
  },
  item: {
    height: "100%",
    px: "5px",
    pb: {
      sm: 0,
      xs: 4,
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
};
