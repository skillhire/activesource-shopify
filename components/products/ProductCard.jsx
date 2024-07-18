import React, { useState, useEffect } from "react";
import {
  Link,
  Box,
  Button,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";
import Image from "next/image";
import {
  getProductColors,
  getMetaValue,
  truncate,
  formatPriceRange,
} from "utils";
import ColorOption from "components/variants/ColorOption";
import ProductEnterpriseChip from "components/products/ProductEnterpriseChip";

const ProductCard = ({ product, productUrl = "/products" }) => {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState();
  const [isEnterprise, setIsEnterprise] = useState();

  const handleColorClick = (color) => null;

  useEffect(() => {
    if (product) {
      setImage(product?.images?.edges[0]?.node?.url);
      let _isEnterprise = getMetaValue(product, "is_enterprise") == "true";
      let formattedColors = getProductColors(product);
      setColors(formattedColors);
      setIsEnterprise(_isEnterprise);
    }
  }, [product]);

  return (
    <Box sx={sx.root}>
      <Link href={`${productUrl}/${product?.handle}`} underline="none">
        {isEnterprise && <Box sx={sx.enterpriseChip}>
          <ProductEnterpriseChip size="small" />
        </Box>}
        <CardActionArea sx={sx.contentActionArea}>
          {image && (
            <Image
              src={image}
              alt={product.title}
              layout="responsive"
              height={240} 
              width={240}              
              style={{
                objectFit: "contain",
              }}
            />
          )}
        </CardActionArea>
      </Link>
      <Stack px={2} py={2} spacing={0.5}>
        <Button
          disableRipple
          onClick={() => handleClick(product)}
          sx={sx.title}
        >
          {truncate(product?.title)}
        </Button>
        <Box sx={sx.colors}>
          {colors?.map((color, i) => (
            <ColorOption
              key={i}
              color={color}
              size={12}
              handleClick={handleColorClick}
            />
          ))}
        </Box>
        {product?.options && product?.options[0].values.length > 0 && (
          <Typography variant="caption" color="textSecondary">
            {product.options[0].values.map((option, i) => (
              <Box key={i} component="span" sx={sx.option}>
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
  title: {
    minHeight: "60px",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    p: 0,
    fontFamily: (theme) => theme.typography.subtitle1.fontFamily,
    fontSize: (theme) => theme.typography.subtitle1.fontSize,
    fontWeight: (theme) => theme.typography.subtitle1.fontWeight,
    "&:hover": {
      bgcolor: "transparent",
    },
  },
  contentActionArea: {
    p: 0,
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: 0,
    height: '100%',
    minHeight: {
      sm: 240,
      xs: 200,
    },
    ".MuiCardActionArea-focusHighlight": {
      background: "transparent",
    },
  },
  option: {
    display: "inline",
  },
  colors: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    height: "40px",
    gap: "4px",
  },
  enterpriseChip: {
    position: "absolute",
    zIndex: 1,
    mt: 1,
    ml: 1
  }
};
