import React, { useEffect, useState, useContext } from "react";
import { CustomizeContext } from "context";
import { Box, CardActionArea, Stack } from "@mui/material";
import Image from "next/image";
import ImageWithLogo from "./ImageWithLogo";
import "react-medium-image-zoom/dist/styles.css";

const ImageSlider = ({
  activeImage,
  images,
  loading,
  handleClick,
  thumbnailSize = 80,
  previewFront,
  previewBack,
  ...props
}) => {
  const { customization } = useContext(CustomizeContext);

  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(false);
    setTimeout(() => setFade(true), 250);
  }, [activeImage]);

  return (
    <Box sx={sx.root}>
      <Stack sx={sx.thumbnails} spacing={2}>
        {images?.map((image) => (
          <CardActionArea
            key={image?.id}
            sx={{
              ...sx.cardActionArea,
              ...sx.thumbnail,
              ...(activeImage?.id === image?.id && sx.activeThumbnail),
            }}
            onClick={() => handleClick(image)}
          >
            <Image
              src={image.src}
              width={thumbnailSize}
              height={thumbnailSize}
              style={sx.image}
              alt={image?.altText}
            />
          </CardActionArea>
        ))}
      </Stack>
      <Box>
        <ImageWithLogo activeImage={activeImage} />
      </Box>
    </Box>
  );
};

export default ImageSlider;

const sx = {
  root: {
    display: "flex",
    flexDirection: {
      xs: "column-reverse",
      sm: "row",
    },
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  mainImage: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: {
      sm: "512px",
      xs: "320px",
    },
    maxWidth: {
      sm: "512px",
      xs: "320px",
    },
  },
  fade: {
    width: "100%",
    opacity: 0.2,
  },
  fadeIn: {
    opacity: 1,
    transition: "opacity 0.50s ease-in-out",
  },
  thumbnails: {
    width: {
      sm: 100,
      xs: "100%",
    },
    height: {
      sm: "100%",
      xs: 100,
    },
    display: "flex",
    flexDirection: {
      xs: "row",
      sm: "column",
    },
    justifyContent: {
      sx: "flex-start",
      sm: "flex-end",
    },
    alignItems: {
      xs: "flex-start",
      sm: "flex-end",
    },
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  activeThumbnail: {
    borderColor: "primary.main",
  },
  cardActionArea: {
    p: 0,
    overflow: "hidden",
    width: "auto",
  },
  image: {
    position: "relative",
    objectFit: "contain",
  },
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
  },
};
