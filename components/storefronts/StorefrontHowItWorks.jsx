import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Step1 from 'assets/step-1-icon.svg';
import Step2 from 'assets/step-2-icon.svg';
import Step3 from 'assets/step-3-icon.svg';
import Image from "next/image";

const FeaturedItem = (props) => {
  const { icon, caption, title, subtitle } = props || {};
  return(
    <Stack 
      direction="row"
      spacing={1}
      sx={{
        alignItems: "flex-start",        
        maxWidth: 480,
      }}
    >
      <Box
        sx={sx.icon}
      >
        <Image 
          src={ icon } 
          height={32} 
          width={32} 
          style={{
            objectFit: 'contain'
          }}
        />
      </Box>
      <Stack direction="column" spacing={1}>
      <Typography variant="caption" color='text.primary'>{caption}</Typography>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Stack>
    </Stack>
  )
}

const StorefrontFeatures = (props) => {  
  const { storefront } = props || {};

  const FEATURED_ITEMS = [
    { icon: Step1, title: 'Pick a Product', subtitle: "Choose from our range of styles, sizes, and colors. We’ve curated the best-fitting, highest-quality apparel so you can be proud of what you offer your members." },
    { icon: Step2, title: 'Customize Your Design', subtitle: "Download curated artwork from image library and customise them for your studio. With 15 different placements and full-color printing, there's virtually no limit on what you can create. Go from generic to “wow!” in just two clicks." },
    { icon: Step3, title: 'Order the Product', subtitle: "Once you click \"order,\" your merch will ship in 1-2 weeks. Congratulations! That custom studio-branded merchandise you've been wanting? It's yours." },
  ]

  return (    
    <Stack
      direction={{ md: 'row', xs: 'column' }}
      spacing={0}
      sx={sx.container}
    >        
      <Stack direction="column" spacing={2} sx={sx.leftPanel}>   
        <Typography 
          variant="h3" 
          sx={ sx.title }
        >
          Custom Merchandize in 3 Easy Steps
        </Typography>
        <Stack
          direction={'column'}
          spacing={4}        
        >
          { FEATURED_ITEMS.map((item, index) => (
            <FeaturedItem 
              icon={ item.icon }
              caption={`STEP ${index + 1}`}
              title={ item.title }
              subtitle={ item.subtitle }
            />
          ))} 
        </Stack>        
      </Stack>
      <Box sx={ sx.rightPanel }>
        <Image 
          src={ storefront?.image2 }
          height={620} 
          width={620}
          layout="responsive"
          style={{
            objectFit: 'cover'
          }}
        />
      </Box>
  </Stack>
  );
};

export default StorefrontFeatures;

const sx = {
  container: {    
    height: "100%",
    width: '100%',
    bgcolor: 'common.white',
    borderRadius: 2,
    overflow: "hidden",
    maxHeight: {
      md: "660px",      
      xs: "auto",
    }

  },
  leftPanel: {
    p: 5,
    width: '100%',
    maxWidth: {
      md: '50%',
      xs: '100%',
    }
  },
  rightPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: {
      md: '50%',
      xs: '100%',
    }
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
  icon: {
    px: 2,
    py: 1
  }
};
