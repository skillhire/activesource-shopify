import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Icon1 from 'assets/on-demand-icon.svg';
import Icon2 from 'assets/shipping-icon.svg';
import Icon3 from 'assets/grow-icon.svg';
import Image from "next/image";

const FeaturedItem = (props) => {
  const { icon, title, subtitle } = props || {};
  return(
    <Stack 
      direction="column"
      spacing={1}
      sx={{
        alignItems: "center",
        textAlign: "center",
        maxWidth: 320,
      }}
    >
      <Box
        sx={sx.icon}
      >
        <Image 
          src={ icon } 
          height={44} 
          width={44} 
          style={{
            objectFit: 'contain'
          }}
        />
      </Box>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{subtitle}</Typography>
    </Stack>
  )
}

const StorefrontFeatures = (props) => {  
  const { storefront } = props || {};

  const FEATURED_ITEMS = [
    { icon: Icon1, title: 'On Demand Production', subtitle: "Our on-demand production system offers made-to-order items, eliminating bulk orders, minimizing waste and maximizing flexibility." },
    { icon: Icon2, title: 'Easy Ordering & Fast Shipping', subtitle: "Our quick and straightforward ordering process ensures fast production and reliable shipping for your custom merchandise." },
    { icon: Icon3, title: 'Grow Your Studio Brand', subtitle: "Custom merchandise boosts your studio’s identity, team spirit, and brand. For events, rewards, or new items, we’ve got you covered." },
  ]

  return (    
    <Stack
      direction={'column'}
      spacing={4}
      sx={sx.header}
    >           
        <Typography 
          variant="h3" 
          sx={ sx.title }
        >
          Create Custom { storefront?.name } Studio Merchandise On Demand
        </Typography>
        <Typography variant="body2" sx={sx.subtitle}>
          Introducing the ultimate platform for F45 Training studio owners to design and order personalized merchandise with ease. Elevate your studio’s brand and build a stronger community with unique, high-quality gear tailored specifically for your members.
        </Typography> 
      <Stack
        direction={{
          sm: 'row',
          xs: 'column'
        }}
        spacing={2}        
      >
        { FEATURED_ITEMS.map((item, index) => (
          <FeaturedItem 
            icon={ item.icon }
            title={ item.title }
            subtitle={ item.subtitle }
          />
        ))} 
      </Stack>
    </Stack>
  );
};

export default StorefrontFeatures;

const sx = {
  header: {
    py: 4,
    pt: 6,
    diplay: "flex",
    alignItems: "center",
    height: "100%",
    width: '100%'
  },
  title: {
    textAlign: "center",
    maxWidth: 960
  },
  subtitle: {
    textAlign: "center",
    maxWidth: 960
  },
  description: {},
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 2,        
    overflow: "hidden",
  },
  content: {
    width: "100%",
    maxWidth: 720,
    pr: {
      sm: 4,
      xs: 0,
    },
    alignItems: {
      sm: "center",
      xs: "center",
    },
  },
  contentRow: {
    maxWidth: 520,
    pt: 4,
    alignItems: {
      sm: "flex-start",
      xs: "center",
    },
  },  
};
