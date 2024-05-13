import { CardActionArea } from "@mui/material";
import { Box } from "@mui/material";
import Image from "next/image";
import { IMAGE_CAROUSEL_RESPONSIVE } from "constants/shop";
import Carousel from "react-multi-carousel";
import { useClickOrDrag } from "hooks";
import ImageCarouselDot from "./ImageCarouselDot";
import Canvas from "./Canvas";
import CarouselLeftArrow from "components/carousels/CarouselLeftArrow";
import CarouselRightArrow from "components/carousels/CarouselRightArrow";

const ImageCarousel = ({
  images,
  activeImage,
  loading,
  handleClick,
  arrows = false,
  responsive = IMAGE_CAROUSEL_RESPONSIVE,
  ...props
}) => {
  const { onMouseDown, onMouseUp } = useClickOrDrag({
    onClick: () => null,
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
          arrows={arrows}
          customLeftArrow={<CarouselLeftArrow />}
          customRightArrow={<CarouselRightArrow />}
          customDot={<ImageCarouselDot numItems={images?.length} />}
        >
          <Box sx={sx.image}>
            <CardActionArea
              disableRipple
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            >
              <Canvas />
            </CardActionArea>
          </Box>
          {images
            ?.filter((image) => image?.id !== activeImage?.id)
            ?.map((image) => (
              <Box key={image?.id} sx={sx.image}>
                <CardActionArea
                  disableRipple
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                >
                  <Image
                    src={image.url}
                    width={1600}
                    height={1600}
                    style={{
                      objectFit: "contain",
                    }}
                    layout="responsive"
                    alt={image?.altText}
                  />
                </CardActionArea>
              </Box>
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
  image: {
    pb: 4,
  },
};
