import React from "react";
import { Stack, Button, Box, Typography } from "@mui/material";
import Image from "next/image";

const StorefrontCover = (props) => {  
  const { storefront, handleClick } = props || {};
  const { direction = "row" } = storefront || {};  

  return (
    <Stack
      direction={{
        sm: direction == "row" ? "row-reverse" : "column",
        xs: "column",
      }}
      spacing={6}
      sx={sx.header}
    >
      <Stack direction='column' spacing={2}>
        <Typography 
          variant="h3" 
          sx={ sx.title }
        >{storefront?.title}</Typography>
        <Typography variant="body2" sx={sx.subtitle}>
          {storefront?.description}
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={ handleClick }
        >
          Shop Now
        </Button>
        </Box>
        </Stack>
      <Box
        sx={{
          ...sx.imageContainer,
          width: direction == "row" ? 520 : "100%",
        }}
      >
        <Image
          src={storefront?.image}
          height={direction == "row" ? 520 : 330}
          width={direction == "row" ? 520 : 600}
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    </Stack>
  );
};

export default StorefrontCover;

const sx = {
  header: {
    py: 4,
    pt: 6,
    diplay: "flex",
    alignItems: "center",
    height: "100%",
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 980
  },
  description: {},
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 2,        
    overflow: "hidden",
  },  
  title: {
    textAlign: "center",    
  },
  titleRow: {
    textAlign: "left",
  },
};
