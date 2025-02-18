import React, { useState } from "react";
import { Stack, Box, Typography, TextField } from "@mui/material";
import { AddToCartButton } from "components";
import QuantitySelector from "components/variants/QuantitySelector";
import Image from "next/image";
import TShirtIcon from 'assets/t-shirt-icon.svg';

const ProductAddToCart = ({
  product,
  variant,  
  customAttributes = {},
  addToCartDisabled,
  enableNotes=false,
  notesDescription='Add notes to your order',
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
          <Typography variant="body2" sx={ sx.text }>
            { notesDescription }
          </Typography>
          <TextField 
            multiline 
            rows={4}            
            fullWidth                        
            placeholder="Add notes to your order"
            onChange={ handleTextChange }
            sx={{
              '& .MuiInputBase-input': {
                fontSize: '15px',
                fontWeight: 400
              },
            }}
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
      <Box sx={ sx.minOrderQuantity }>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={0} sx={{ alignItems: 'center' }}>
            <Image 
              src={ TShirtIcon } 
              height={24}
              width={24}
            />
            <Typography variant="body1" color='brand.main' sx={{ ml: 0.5 }}>
              x {minQuantity}
            </Typography>
          </Stack>
          <Typography variant="subtitle2" color='text.primary'>
            Minimum Order Requirement
          </Typography>
          <Typography variant="body2" sx={ sx.text }>
            {minQuantity}-piece minimum per style. Sizes may vary, but color and artwork must be the same.
          </Typography>
        </Stack> 
      </Box>
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
  text: {
    whiteSpace: "pre-wrap",
  },
  minOrderQuantity: {
    p: 2,
    backgroundColor: 'brand.light',
    borderRadius: 3,
  }
};
