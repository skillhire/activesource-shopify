import React, { useState, useEffect } from "react";
import { useClickOrDrag } from "hooks";
import { Box, CardActionArea, Typography } from "@mui/material";
import { Image } from "components";
import { truncate, formatCurrency } from "utils";
import ColorOption from "components/variants/ColorOption";
import { color } from "framer-motion";

const ProductItem = ({ product, handleClick }) => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState();

  const { onMouseUp, onMouseDown } = useClickOrDrag({
    onClick: () => handleClick(product),
  });

  useEffect(() => {
    if (product) {
    }
  }, [product]);

  const handleColorClick = (color) => {};

  useEffect(() => {
    if (product) {
      setImage(product?.images?.edges[0]?.node?.src);
      let _colors = product.metafields
        .find((metafield) => metafield.key === "colors")
        .references.edges.map((e) => e.node);
      setColors(_colors);
    }
  }, [product]);

  return (
    <Box sx={sx.root}>
      <CardActionArea
        disableRipple
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        sx={sx.contentActionArea}
      >
        {image && (
          <Image
            fill
            alt={product.title}
            src={image}
            styles={{
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </CardActionArea>
      <Box sx={sx.content}>
        <Typography variant="body1" color="textPrimary" sx={sx.title}>
          {truncate(product?.title)}
        </Typography>
        <Typography variant="button" color="textPrimary" sx={sx.price}>
          {formatCurrency(product?.priceRange?.minVariantPrice?.amount)}
        </Typography>
        {colors?.map((color, i) => (
          <ColorOption
            key={i}
            color={color}
            size={20}
            handleClick={handleColorClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProductItem;

const sx = {
  root: {
    width: "100%",
    minHeight: 300,
    backgroundColor: "background.paper",
  },
  content: {
    p: 1,
    px: 2,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    cursor: "pointer",
  },
  contentActionArea: {
    cursor: "pointer",
    overflow: "hidden",
    ".MuiCardActionArea-focusHighlight": {
      background: "transparent",
    },
  },
};
