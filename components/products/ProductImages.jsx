import { Box } from "@mui/material";
import { ImageCarousel, ImageSlider } from "components";
import { useResponsive } from "hooks";

const ProductImages = ({
  product,
  zoom = false,
  images,
  activeImage,
  handleClick,
  handleClose,
  ...props
}) => {
  const { isMobile } = useResponsive();

  return (
    <Box sx={sx.root}>
      {isMobile ? (
        <ImageCarousel images={images} handleClick={handleClick} />
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
    pt: 4,
  },
};
