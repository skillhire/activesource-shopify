import PropTypes from "prop-types";
import { useResponsive } from "hooks";
import { Box } from "@mui/material";
import {
  CarouselRightArrow,
  CarouselLeftArrow,
  Collection,
  CollectionSkeleton,
} from "components";
import Carousel from "react-multi-carousel";
import { CAROUSEL_RESPONSIVE } from "constants/shop";
import "react-multi-carousel/lib/styles.css";

const CollectionCarousel = ({
  collections,
  loading,
  autoPlay = false,
  swipeable = false,
  draggable = false,
  showDots = false,
  perPage = 20,
  responsive = CAROUSEL_RESPONSIVE,
  ...props
}) => {
  return (
    <Box sx={sx.root}>
      {collections ? (
        <Carousel
          swipeable={swipeable}
          draggable={draggable}
          showDots={showDots}
          responsive={responsive}
          ssr
          infinite
          autoPlay={autoPlay}
          keyBoardControl
          transitionDuration={500}
          itemClass={"carousel-item"}
          customLeftArrow={<CarouselLeftArrow />}
          customRightArrow={<CarouselRightArrow />}
        >
          {collections.map((collection) => (
            <Collection key={collection.id} collection={collection} />
          ))}
        </Carousel>
      ) : (
        <Box display="flex" justifyContent="space-between" flexDirection="row">
          {[...Array(6)].map((_, i) => (
            <CollectionSkeleton key={i} sx={sx.item} />
          ))}
        </Box>
      )}
    </Box>
  );
};

CollectionCarousel.propTypes = {
  collections: PropTypes.array,
  loading: PropTypes.bool,
  styles: PropTypes.object,
  autoPlay: PropTypes.bool,
  swipeable: PropTypes.bool,
  draggable: PropTypes.bool,
  showDots: PropTypes.bool,
};

export default CollectionCarousel;

const sx = {
  root: {},
};
