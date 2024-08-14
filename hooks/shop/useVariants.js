import React, { useState, useEffect } from "react";

const useVariants = ({ product, setSelectedOptions, selectedOptions }) => {
  const [variant, setVariant] = useState();
  const [variantImage, setVariantImage] = useState();

  const selectVariant = (selectedOptions) => {
    const selectedVariant = product.variants.edges.find(({ node: variant }) =>
      variant.selectedOptions.every((option) => {
        return selectedOptions[option.name] == option.value;
      })
    );
    if(selectedVariant?.node){
      setVariant(selectedVariant?.node);
    }
  };

  useEffect(() => {
    if (Object.keys(selectedOptions)?.length > 0 && product?.handle) {      
      selectVariant(selectedOptions);
    }
  }, [selectedOptions, product?.handle]);

  // Handle single variant
  useEffect(() => {    
    if(product?.handle){
      let _variant = product?.variants?.edges[0]?.node
      let variantColor = _variant?.selectedOptions?.find(option => option.name === 'Color')?.value
      let variantSize = _variant?.selectedOptions?.find(option => option.name === 'Size')?.value
      let _selectedOptions = {
        Color: variantColor,
        Size: variantSize 
      }
      setVariant(_variant);
      setSelectedOptions(_selectedOptions);
    }
  }, [product?.handle]);

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
