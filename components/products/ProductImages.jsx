import { Box } from "@mui/material";
import { ImageCarousel, ImageSlider } from "components";
import { useResponsive } from "hooks";

const ProductImages = ({ images, activeImage, handleClick, ...props }) => {
  const { isMobile } = useResponsive();

  return (
    <Box sx={sx.root}>
      {isMobile ? (
        <ImageCarousel
          arrows
          images={images}
          activeImage={activeImage}
          handleClick={handleClick}
        />
      ) : (
        <ImageSlider
          images={images}
          handleClick={handleClick}
          activeImage={activeImage}
        />
      )}
    </Box>
  );
};

export default ProductImages;

const sx = {
  root: {
    width: '100%',
  },
};
