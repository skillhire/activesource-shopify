import React, { useState, useContext, useEffect } from "react";
import { useCustomization } from "hooks";
import { Stack, Typography, Box } from "@mui/material";
import { formatPriceRange, formatCurrency, getMetaValue, getProductColors } from "utils";
import { VariantSelector, ProductEnterpriseChip } from "components";
import CustomColorSelect from "components/variants/CustomColorSelect";

const ProductDetails = ({
  product,
  variant,
  activeColor,
  selectedOptions,
  handleOptionChange,
  customAttributes,
  handleColorClick,
}) => {
  const { priceRange } = product || {};
  const { minVariantPrice } = priceRange || {};

  const [price, setPrice] = useState();
  const [enterpriseProductDescription, setEnterpriseProductDescription] = useState();
  const [isEnterprise, setIsEnterprise] = useState();
  const [brand, setBrand] = useState();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (variant) {
      setPrice(variant?.price?.amount);
    } else {
      setPrice(minVariantPrice?.amount);
    }
  }, [variant, minVariantPrice]);

  useEffect(() => {
    if (product?.metafields?.length > 0) {
      let formattedColors = getProductColors(product);
      let _isEnterprise = getMetaValue(product, "is_enterprise") == "true";
      let _enterpriseProductDescription = getMetaValue(product, "enterprise_product_description");
      let _brand = getMetaValue(product, "brand");
      setColors(formattedColors);
      setIsEnterprise(_isEnterprise);
      setBrand(_brand);
      setEnterpriseProductDescription(_enterpriseProductDescription);
    }
  }, [product]);

  return (
    <Stack spacing={2}>
      {product && (
        <>
          {isEnterprise && (
            <Box>
              <ProductEnterpriseChip />
            </Box>
          )}
          <Typography variant="h4">{product?.title}</Typography>
          { brand && (
            <Typography variant="button">
              Brand: { brand }
            </Typography>
          )}
          <Typography variant="button">
            {
              isEnterprise ? (
                <>
                  Starting from {' '}
                  {formatCurrency(product.priceRange.minVariantPrice.amount)}
                </>
              ) : (
                formatPriceRange(
                  product.priceRange.minVariantPrice.amount,
                  product.priceRange.maxVariantPrice.amount
                )
              )
            }
          </Typography>
          {enterpriseProductDescription && <Typography variant="body2" sx={ sx.text }>{enterpriseProductDescription}</Typography>}
          {!isEnterprise && (
            <>
              <CustomColorSelect
                colors={colors}
                activeColor={activeColor}
                handleClick={handleColorClick}
                customAttributes={customAttributes}
              />
              <VariantSelector
                handleChange={handleOptionChange}
                selectedOptions={selectedOptions}
                options={product?.options}
              />
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default ProductDetails;

const sx = {
  text: {
    whiteSpace: "pre-wrap",
  }
}
