import PropTypes from "prop-types";
import { CardActionArea, Grid } from "@mui/material";
import { Image, ImageSkeleton } from "components";

const ImageGrid = ({
  images,
  loading,
  onClick,
  itemWidth = 500,
  itemHeight = 500,
  numSkeletons = 4,
  xs = 12,
  sm = 6,
  md = 6,
  lg = 6,
  ...props
}) => {
  return (
    <Grid container spacing={1}>
      {images
        ? images.map((image, i) => (
            <Grid item key={i} xs={xs} sm={sm} md={md} lg={lg}>
              <CardActionArea sx={sx.cardActionArea} onClick={() => onClick(i)}>
                <Image src={image} width={itemWidth} height={itemWidth} />
              </CardActionArea>
            </Grid>
          ))
        : [...Array(numSkeletons)].map((_, i) => (
            <Grid item xs={xs} sm={sm} md={md} lg={lg} key={i}>
              <ImageSkeleton />
            </Grid>
          ))}
    </Grid>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.array,
  loading: PropTypes.bool,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default ImageGrid;

const sx = {
  cardActionArea: {
    p: 0,
    overflow: "hidden",
  },
};
