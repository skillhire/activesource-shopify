import React, { useState, useEffect } from "react";
import { Modal } from "components";
import { Grid, Stack, Typography, CardActionArea } from "@mui/material";
import { getMetaValue } from "utils";
import { useColors } from "hooks";
import Image from "next/image";

const Thumbnail = ({ src, handleClick }) => (
  <CardActionArea onClick={handleClick} sx={sx.thumbnail}>
    <Image
      src={src}
      width={100}
      height={100}
      alt={"Thumbnail"}
      style={{
        objectFit: "contain",
        width: "100%",
      }}
    />
  </CardActionArea>
);

const ProductCustomizeModal = ({
  open = false,
  handleClose,
  color,
  product,
  customAttributes,
  handleChange,
}) => {
  const [image, setImage] = useState();
  const [activeColor, setActiveColor] = useState();
  const [activeImage, setActiveImage] = useState();
  const [placement, setPlacement] = useState("front");

  const { colors, fetchColors } = useColors();

  useEffect(() => {
    if (open) {
      fetchColors();
    }
  }, [open]);

  useEffect(() => {
    if (colors?.length > 0 && color) {
      const active = colors.find((c) => c.handle == color.handle);
      setActiveColor(active);
      setActiveImage(active?.front_placement);
    }
  }, [colors, color]);

  const isFront = getMetaValue(product, "front_placement");
  const isBack = getMetaValue(product, "back_placement");

  const handleThumbnailClick = (placement) => {
    setPlacement(placement);
    if (placement == "front") {
      setActiveImage(activeColor?.front_placement);
    } else if (placement == "back") {
      setActiveImage(activeColor?.back_placement);
    }
  };

  return (
    <Modal fullScreen open={open} handleClose={handleClose}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Image
            src={activeImage}
            width={500}
            height={500}
            alt={"Image"}
            style={{
              objectFit: "contain",
              width: "100%",
            }}
            responsive="true"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3">{product?.title}</Typography>
          {activeColor && (
            <Stack direction="row" spacing={2}>
              {isFront && (
                <Thumbnail
                  src={activeColor?.front_placement}
                  handleClick={() => handleThumbnailClick("front")}
                />
              )}
              {isBack && (
                <Thumbnail
                  src={activeColor?.back_placement}
                  handleClick={() => handleThumbnailClick("back")}
                />
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ProductCustomizeModal;

const sx = {
  thumbnail: {
    p: 0,
  },
};
