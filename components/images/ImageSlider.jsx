import React from "react";
import { CardActionArea, Stack } from "@mui/material";
import Image from "next/image";
import Canvas from "./Canvas";

const Thumbnail = (props) => {

  const {
     height, 
     width, 
     image,
     activeImage,
     handleClick 
    } = props || {}

  return(
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
        src={image.url}
        width={width}
        height={height}
        style={{
          position: "relative",
          objectFit: "cover",            
        }}
        alt={image?.altText}
      />
    </CardActionArea>
  )
}

const ImageSlider = ({
  activeImage,
  images,
  loading,
  handleClick,
  thumbnailSize = 100,
  previewFront,
  previewBack,
  ...props
}) => {

  return (
    <Stack direction="row" spacing={3} sx={sx.root}>
      <Stack sx={sx.thumbnails} spacing={1}>
        {images?.map((image) => (
          <Thumbnail 
            key={image.id}
            height={thumbnailSize}
            width={thumbnailSize}
            image={image}
            activeImage={activeImage}
            handleClick={handleClick}
          />
        ))}
      </Stack>      
      <Canvas 
        enableZoom 
        activeImage={activeImage} 
      />      
    </Stack>
  );
};

export default ImageSlider;

const sx = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: {
      xs: "column-reverse",
      sm: "row",
    },
    justifyContent: "flex-start",
    alignItems: "flex-start",
    mb: 4
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
    height: 100,
    width: 100
  },
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
  },
};
