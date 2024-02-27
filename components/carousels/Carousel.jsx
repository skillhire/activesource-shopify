import React from "react";
import { CarouselLeftArrow, CarouselRightArrow } from "components";
import { CarouselDot } from "components";
import Carousel from "react-multi-carousel";
import { CAROUSEL_RESPONSIVE } from "constants/shop";
import "react-multi-carousel/lib/styles.css";

const MuiCarousel = ({
  children,
  swipeable = true,
  draggable = true,
  showDots = true,
  arrows = false,
  responsive = CAROUSEL_RESPONSIVE,
  autoPlay = true,
  numItems = 5,
  width = 960,
  customDot: CustomDot = CarouselDot,
}) => {
  return (
    <Carousel
      swipeable={swipeable}
      draggable={draggable}
      showDots={showDots}
      arrows={arrows}
      responsive={responsive}
      ssr
      infinite
      autoPlay={autoPlay}
      keyBoardControl
      itemClass={"carousel-item"}
      customDot={<CustomDot width={width} numItems={numItems} />}
      customLeftArrow={<CarouselLeftArrow />}
      customRightArrow={<CarouselRightArrow />}
    >
      {children?.length > 0 && children}
    </Carousel>
  );
};

export default MuiCarousel;
