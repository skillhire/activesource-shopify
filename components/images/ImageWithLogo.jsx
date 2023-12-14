import React, { useContext } from "react";
import { CustomizeContext } from "context";
import { Box } from "@mui/material";
import Image from "next/image";
import "react-medium-image-zoom/dist/styles.css";

const ImageWithBorder = ({
  src,
  top,
  left,
  height,
  width,
  enableBorder = false,
  ...props
}) => {
  return (
    <>
      <Image
        src={src}
        width={512}
        height={512}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
          position: "absolute",
          objectFit: "contain",
        }}
      />
      {enableBorder && (
        <Box
          sx={{
            border: "2px solid blue",
            top: top,
            left: left,
            height: height,
            width: width,
            position: "absolute",
          }}
        />
      )}
    </>
  );
};

const ImageWithLogo = ({ activeImage, ...props }) => {
  const { customization } = useContext(CustomizeContext);

  if (!activeImage) return null;
  return (
    <Box sx={sx.root}>
      {(activeImage?.src || activeImage?.url) && (
        <Image
          src={activeImage?.src || activeImage?.url}
          width={512}
          height={512}
          style={sx.image}
          alt={activeImage?.altText}
          responsive={true}
        />
      )}
      {customization?.frontLogo &&
        customization?.front &&
        activeImage?.isFront && (
          <ImageWithBorder
            enableBorder
            src={customization?.frontLogo}
            top={customization?.front?.top}
            left={customization?.front?.left}
            height={customization?.front?.height}
            width={customization?.front?.width}
          />
        )}
      {customization?.backLogo &&
        customization?.back &&
        activeImage?.isBack && (
          <ImageWithBorder
            enableBorder
            src={customization?.backLogo}
            top={customization?.back?.top}
            left={customization?.back?.left}
            height={customization?.back?.height}
            width={customization?.back?.width}
          />
        )}
    </Box>
  );
};

export default ImageWithLogo;

const sx = {
  root: {
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
  image: {
    position: "relative",
    objectFit: "contain",
  },
};
