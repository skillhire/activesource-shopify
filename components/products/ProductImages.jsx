import { Hidden, Box } from "@mui/material";
import { ImageCarousel, ImageSlider } from "components";
import { useResponsive } from "hooks";

const ProductImages = ({ images, activeImage, handleClick, ...props }) => {

  return (
    <Box sx={sx.root}>
      <Hidden smUp>
        <ImageCarousel
          arrows
          images={images}
          activeImage={activeImage}
          handleClick={handleClick}
        />
      </Hidden>
      <Hidden smDown>
        <ImageSlider
          images={images}
          handleClick={handleClick}
          activeImage={activeImage}
        />
      </Hidden> 
    </Box>
  );
};

export default ProductImages;

const sx = {
  root: {
    width: '100%',
  },
};
