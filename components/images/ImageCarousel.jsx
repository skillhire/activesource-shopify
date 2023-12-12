import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";
import { IMAGE_CAROUSEL_RESPONSIVE } from "constants/shop";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useClickOrDrag } from "hooks";
import ImageCarouselDot from "./ImageCarouselDot";

const ImageCarousel = ({
  images,
  loading,
  handleClick,
  itemWidth = 500,
  itemHeight = 500,
  numSkeletons = 4,
  xs = 12,
  sm = 6,
  md = 6,
  lg = 6,
  responsive = IMAGE_CAROUSEL_RESPONSIVE,
  ...props
}) => {
  const { onMouseDown, onMouseUp } = useClickOrDrag({
    onClick: handleClick,
  });

  return (
    <Box sx={sx.mobileCarousel}>
      {images && (
        <Carousel
          swipeable={true}
          draggable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          slidesToSlide={1}
          showDots={images?.length > 1 ? true : false}
          arrows={false}
          customDot={<ImageCarouselDot numItems={images?.length} />}
        >
          {images?.map((image) => (
            <CardActionArea
              disableRipple
              sx={sx.cardActionArea}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            >
              <Image
                key={image?.id}
                src={image.src}
                width={500}
                height={500}
                quality={100}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                responsive={true}
                alt={image?.altText}
              />
            </CardActionArea>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default ImageCarousel;

const sx = {
  mobileCarousel: {
    width: "100%",
  },
  active: {
    opacity: 1.0,
    color: "primary.main",
  },
  cardActionArea: {
    p: 0,
    width: "100%",
  },
};
