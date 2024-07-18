import React from "react";
import {  
  ProductCollection,  
} from "components";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";
import { Typography } from "@mui/material";

const StorefrontFeaturedCollection = (props) => {
  
  const { storefront, handleClick } = props || {}
  const router = useRouter();
  const { store } = router?.query;

  return (
    <Box sx={sx.collection}>
      {storefront?.collection && (
        <>
          <Typography variant="h3" sx={ sx.title }>
            Featured Products 
          </Typography>
          <ProductCollection
            variant={"grid"}
            handle={storefront?.collection.handle}
            productUrl={`/storefronts/${store}/products`}
            perPage={8}
          />
          <Box 
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',            
            }}
          >
            <Button 
              variant="contained"
              color="primary"
              onClick={ handleClick }
            >
              Shop All 
            </Button>
          </Box>          
        </>
      )}
    </Box>
  );
};

export default StorefrontFeaturedCollection;

const sx = {
  collection: {
    width: "100%",    
  },
  title: {
    textAlign: 'center'
  }
};
