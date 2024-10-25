import React, { useState } from "react";
import { Stack, Typography, TextField } from "@mui/material";
import { AddToCartButton } from "components";
import QuantitySelector from "components/variants/QuantitySelector";
import Image from "next/image";
import InfoIcon from 'assets/info-icon.svg';

const ProductAddToCart = ({
  product,
  variant,  
  customAttributes = {},
  addToCartDisabled,
  enableNotes=false,
  notesLabel='Add notes to your order',
  minQuantity=0
}) => {

  const [notes, setNotes] = useState('');
  const handleTextChange = (e) => {
    setNotes(e.target.value);
  }
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <Stack spacing={3} mt={2}>
      { enableNotes && (
        <Stack spacing={1}>
          <Typography variant="subtitle1">
            Customization
          </Typography>
          <Typography variant="body2">
            { notesLabel }
          </Typography>
          <TextField 
            multiline 
            rows={4}            
            fullWidth                        
            placeholder="Add notes to your order"
            onChange={ handleTextChange }
          />
        </Stack>
      )}
      <Stack spacing={1} direction="row" sx={sx.root}>
        <QuantitySelector
          quantity={quantity}
          handleChange={handleQuantityChange}
        />
        <AddToCartButton
          notes={notes}
          disabled={addToCartDisabled}
          quantity={quantity}
          variant={variant}
          product={product}
          customAttributes={customAttributes}
        />      
      </Stack>
    { minQuantity > 0 && (
      <Stack direction="row" spacing={2}>
        <Image 
          src={ InfoIcon } 
          height={32}
          width={32}
        />
        <Typography variant="body2">
          { minQuantity } pieces minimum per style, sizes may vary.
        </Typography>
      </Stack>
    )}
    </Stack>
  );
};

export default ProductAddToCart;

const sx = {
  root: {
    mt: 2,
    my: 3,
  },
};
