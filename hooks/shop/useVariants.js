import React, { useState, useEffect } from "react";

const useVariants = ({ product, setSelectedOptions, selectedOptions }) => {
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
    if(product?.handle){
      let _variant = product?.variants?.edges[0]?.node
      let _selectedOptions = {
        Color: _variant?.selectedOptions[0]?.value,
        Size: _variant?.selectedOptions[1]?.value
      }
      setSelectedOptions(_selectedOptions);
      setVariant(_variant);    
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
