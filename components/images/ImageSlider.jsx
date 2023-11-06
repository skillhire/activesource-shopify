import React, { useEffect, useState } from "react";
import { Box, CardActionArea, Fade } from "@mui/material";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Close } from "@mui/icons-material";

const ImageSlider = ({
  activeImage,
  images,
  loading,
  handleClick,
  thumbnailSize = 80,
  ...props
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(false);
    setTimeout(() => setFade(true), 250);
  }, [activeImage]);

  return (
    <Box sx={sx.root}>
      <Box sx={sx.thumbnails}>
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
      </Box>
      <Box sx={{ ...sx.fade, ...(fade && sx.fadeIn) }}>
        <Box sx={sx.mainImage}>
          {(activeImage?.src || activeImage?.url) && (
            <Zoom IconUnzoom={Close}>
              <Image
                src={activeImage?.src || activeImage?.url}
                width={500}
                height={500}
                style={sx.image}
                alt={activeImage?.altText}
                responsive="true"
              />
            </Zoom>
          )}
        </Box>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "100vw",
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
  thumbnail: {
    border: "2px solid",
    borderColor: "common.white",
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
    objectFit: "contain",
  },
};
