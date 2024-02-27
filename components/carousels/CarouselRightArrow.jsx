import React from "react";
import { IconButton } from "@mui/material";
import ChevronRightIcon from 'assets/chevron-right.svg'
import Image from 'next/image'

const CarouselRightArrow = ({ onClick, ...props }) => {
  return (
    <IconButton
      variant="contained"
      sx={sx.button}
      onClick={onClick}
    >
      <Image 
        src={ ChevronRightIcon?.src } 
        width={13}
        height={24}
      />
    </IconButton>
  );
};

export default CarouselRightArrow;

const sx = {
  button: {
    p: 0,
    "&": {
      backgroundColor: "transparent",
      position: "absolute",
      right: 4,
      '&:hover': {
        backgroundColor: "transparent",
      }
    },
  },
};
