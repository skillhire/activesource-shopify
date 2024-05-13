import React, { useState, useEffect } from "react";

const useVariants = ({ product, selectedOptions }) => {
  const [variant, setVariant] = useState();
  const [variantImage, setVariantImage] = useState();

  const selectVariant = () => {
    const selectedVariant = product.variants.edges.find(({ node: variant }) =>
      variant.selectedOptions.every((option) => {
        return selectedOptions[option.name] == option.value;
      })
    );
    setVariant(selectedVariant?.node);
  };

  useEffect(() => {
    if (Object.keys(selectedOptions)?.length > 0 && product) {
      selectVariant();
    }
  }, [selectedOptions]);

  // Handle single variant
  useEffect(() => {
    if (product?.variants?.edges?.length == 1) {
      setVariant(product.variants.edges[0].node);
    } else {
      setVariant(null);
    }
  }, [product]);

  useEffect(() => {
    if (variant?.node?.image) {
      setVariantImage(variant?.node?.image);
    }
  }, [variant]);

  return {
    variant,
    setVariant,
    variantImage,
  };
};

export default useVariants;
