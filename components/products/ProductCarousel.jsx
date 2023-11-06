import React from "react";
import { useResponsive, useSegment } from "hooks";
import { Box } from "@mui/material";
import {
  CarouselRightArrow,
  CarouselLeftArrow,
  ProductCard,
  ProductSkeleton,
} from "components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CAROUSEL_RESPONSIVE } from "constants/shop";
import { useRouter } from "next/router";
import CarouselDot from "components/carousels/CarouselDot";

const ProductCarousel = ({
  products,
  centerMode = false,
  swipeable = true,
  draggable = true,
  autoPlay = false,
  responsive = CAROUSEL_RESPONSIVE,
  styles,
}) => {
  const router = useRouter();
  const { trackProductClicked } = useSegment();

  const { isMobile } = useResponsive();

  const handleClick = (product) => {
    trackProductClicked(product);
    router.push(`/products/${product.handle}`);
  };

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      {products ? (
        <Carousel
          centerMode={centerMode}
          swipeable={swipeable}
          draggable={draggable}
          showDots={isMobile ? true : false}
          arrows={isMobile ? false : true}
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
              <ProductCard product={product} handleClick={handleClick} />
            </Box>
          ))}
        </Carousel>
      ) : (
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          {[...Array(6)].map((_, i) => (
            <ProductSkeleton key={i} sx={sx.item} />
          ))}
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
    px: "5px",
    pb: {
      sm: 0,
      xs: 4,
    },
  },
};
