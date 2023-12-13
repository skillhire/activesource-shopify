import React, { useState, useEffect } from "react";
import { useClickOrDrag } from "hooks";
import { Box, CardActionArea, Typography, Stack } from "@mui/material";
import Image from "next/image";
import { getValue, getImage } from "utils";
import { truncate, formatPriceRange } from "utils";
import ColorOption from "components/variants/ColorOption";

const ProductCard = ({ product, handleClick }) => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState();

  const { onMouseUp, onMouseDown } = useClickOrDrag({
    onClick: () => handleClick(product),
  });  

  const handleColorClick = (color) => {};

  useEffect(() => {
    if (product) {
      setImage(product?.images?.edges[0]?.node?.src);
      let _colors = product.metafields
        .find((metafield) => metafield?.key === "colors")
        ?.references.edges.map((e) => e.node);
      let formattedColors = _colors.map((color) => ({
        id: color?.id,
        hex: getValue(color, "color"),
        name: getValue(color, "name"),
        front_placement: getImage(color, "front_placement"),
        back_placement: getImage(color, "back_placement"),
      }));
      setColors(formattedColors);
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
            src={image}
            alt={product.title}
            objectFit="contain"
            layout="fill"
          />
        )}
      </CardActionArea>
      <Stack px={2} py={2} spacing={0.5}>
        <Typography
          variant="subtitle1"
          size="small"
          color="textPrimary"
          sx={sx.title}
        >
          {truncate(product?.title)}
        </Typography>
        <Stack direction="row" spacing={0}>
          {colors?.map((color, i) => (
            <ColorOption
              key={i}
              color={color}
              size={12}
              handleClick={handleColorClick}
            />
          ))}
        </Stack>
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
            {formatPriceRange(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.maxVariantPrice.amount
            )}
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
    height: "100%",
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contentActionArea: {
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: 0,
    minHeight: 300,
    "@media (max-width: 600px)": {
      minHeight: 150,
    },
    ".MuiCardActionArea-focusHighlight": {
      background: "transparent",
    },
  },
  option: {
    display: "inline",
  },
};
