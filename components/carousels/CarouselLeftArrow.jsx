import React from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft } from "lucide-react";

const CarouselLeftArrow = ({ onClick, ...props }) => {
  return (
    <IconButton
      variant="contained"
      sx={sx.button}
      onClick={onClick}
    >
      <Image 
        src={ ChevronLeftIcon?.src } 
        width={13}
        height={24}
      />
    </IconButton>
  );
};

export default CarouselLeftArrow;
import ChevronLeftIcon from 'assets/chevron-left.svg'
import Image from 'next/image'

const sx = {
  button: {
    p: 0,
    "&": {
      backgroundColor: "transparent",
      position: "absolute",
      left: 4,
      '&:hover': {
        backgroundColor: "transparent",
      }
    },
  },
};
