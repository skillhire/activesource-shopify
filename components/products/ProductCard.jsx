import React, { useState, useEffect } from "react";
import { useClickOrDrag } from "hooks";
import { Box, CardActionArea, Typography, Stack } from "@mui/material";

import { truncate, formatPriceRange } from "utils";
import { Image } from "components";
import ColorOption from "components/variants/ColorOption";

const ProductCard = ({ product, handleClick }) => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState();

  const { onMouseUp, onMouseDown } = useClickOrDrag({
    onClick: () => handleClick(product),
  });

  useEffect(() => {
    if (product) {
    }
  }, [product]);

  const handleColorClick = (color) => { };

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
          <Image src={image} alt={product.title} objectFit="contain" />
        )}
      </CardActionArea>
      <Stack px={2} py={2} spacing={0.5}>
        <Typography variant="subtitle1" size="small" color="textPrimary" sx={sx.title}>
          {truncate(product?.title)}
        </Typography>
        {colors?.map((color, i) => (
          <ColorOption
            key={i}
            color={color}
            size={12}
            handleClick={handleColorClick}
          />
        ))}
        {product?.options && product?.options[0].values.length > 0 && (
          <Typography variant="caption" color="textSecondary">
            {product.options[0].values.map((option, i) => (
              <Box component="span" sx={sx.option}>
                {option}
                {i < product.options[0].values.length - 1 && " - "}
              </Box>
            ))}
          </Typography>
        )}
        {product?.priceRange && (
          <Typography variant="button" color="textPrimary">
            {formatPriceRange(product.priceRange.minVariantPrice.amount, product.priceRange.maxVariantPrice.amount)}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default ProductCard;

const sx = {
  root: {
    width: "100%",
    minHeight: 300,
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "background.paper",
  },
  contentActionArea: {
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: 0,
    ".MuiCardActionArea-focusHighlight": {
      background: "transparent",
    },
  },
  option: {
    display: "inline",
  }
};
