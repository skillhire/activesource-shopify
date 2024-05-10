import React, { useState, useEffect } from "react";
import { useStorefronts } from "hooks";
import { ProductGrid, ProductCollection, StorefrontLayout } from "components";
import { useRouter } from "next/router";
import { Grid, Box, Stack, Typography } from "@mui/material";
import Image from 'next/image'

const Storefront = (props) => {
  const router = useRouter();
  const { handle } = router.query;

  const { storefront, fetchStorefront } = useStorefronts();

  useEffect(() => {
    if (handle) {
      fetchStorefront(handle);
    }
  }, [handle]);

  useEffect(() => {
    console.log(storefront)
  }, [storefront])

  return (
    <StorefrontLayout
      name={ storefront?.name }
    >
      <Stack direction="column" spacing={4} sx={ sx.header }>  
        <Image 
          src={ storefront?.image } 
          height={200}
          width={600}
          layout="responsive"
        />
        <Typography variant="h3">
          { storefront?.title }
        </Typography>
        <Typography variant="body1" sx={ sx.description }>
          { storefront?.description }
        </Typography>        
      </Stack>
      <Box sx={ sx.collection }>
        {storefront?.collection && (
          <ProductCollection
            variant={"grid"}
            handle={storefront?.collection.handle}            
          />
        )}
      </Box> 
    </StorefrontLayout>
  );
};

export default Storefront;

const sx = {
  header: {
    py: 4,
    pt: 6,
    diplay: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  description: {
    maxWidth: 600,
    textAlign: "center",
  },
  collection: {
    width: "100%"
  }
}