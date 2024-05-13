import React, { useEffect } from "react";
import { useStorefronts } from "hooks";
import { StorefrontCover, ProductCollection, StorefrontLayout } from "components";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

const Storefront = (props) => {
  const router = useRouter();
  const { store } = router.query;

  const { storefront, fetchStorefront } = useStorefronts();

  useEffect(() => {
    if (store) {
      fetchStorefront(store);
    }
  }, [store]);

  if(!storefront?.name) return null;
  return (
    <StorefrontLayout
      storefront={ storefront }
    >
      <StorefrontCover 
        storefront={ storefront }
      />      
    <Box sx={ sx.collection }>
      {storefront?.collection && (
        <ProductCollection
          variant={"grid"}
          handle={storefront?.collection.handle}            
          productUrl={`/storefronts/${store}/products`}
        />
      )}
    </Box> 
  </StorefrontLayout>
  );
};

export default Storefront;

const sx = {
  collection: {
    width: "100%"
  }
}