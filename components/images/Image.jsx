import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";

const NextImage = ({
  src,
  height = 240,
  maxHeight = "none",
  objectFit = "contain",
  alt,
  styles = {}, // next/image style object (not sx)
}) => {
  const fastlyLoader = ({ src, width, quality }) => {
    let extension = src.split(".").pop();
    let filePath = src.split(`.${extension}`)[0];
    let resizedUrl = `${filePath}_${width}x${height}.${extension}`;
    return resizedUrl;
  };

  return (
    <Box
      sx={{
        ...sx.root,
        minHeight: height,
        maxHeight,
      }}
    >
      <Image
        fill
        loader={fastlyLoader}
        src={src}
        alt={alt}
        style={{
          objectFit: objectFit,
          ...styles,
        }}
      />
    </Box>
  );
};

NextImage.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
  objectFit: PropTypes.string,
};

export default NextImage;

const sx = {
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
};
