import React, { useState, useContext, useEffect } from "react";
import { useCustomization } from "hooks";
import { Stack, Typography, Box } from "@mui/material";
import { formatPriceRange, formatCurrency, getMetaValue, getProductColors } from "utils";
import { VariantSelector, ProductEnterpriseChip } from "components";
import CustomColorSelect from "components/variants/CustomColorSelect";
import { CustomizeContext } from "context";

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
      setColors(formattedColors);
      setIsEnterprise(_isEnterprise);
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
          <Typography variant="button">
            {
              isEnterprise ? (
                <>
                  From {' '}
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
          {enterpriseProductDescription && <Typography variant="body2">{enterpriseProductDescription}</Typography>}
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
