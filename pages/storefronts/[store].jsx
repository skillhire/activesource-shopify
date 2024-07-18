import React, { useEffect } from "react";
import { useStorefronts } from "hooks";
import {
  StorefrontCover,
  StorefrontFeatures,
  StorefrontFeaturedCollection,
  StorefrontHowItWorks,  
  StorefrontPhotos,
  StorefrontLayout,
} from "components";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { buildStorePath } from "utils";

const Storefront = (props) => {
  const router = useRouter();
  const { store } = router.query;

  const { photos, storefront, fetchStorefront } = useStorefronts();

  const handleClick = () => {
    let url = `/collections/${storefront?.collection?.handle}`
    router.push(buildStorePath(store, url));    
  }

  useEffect(() => {
    if (store) {
      fetchStorefront(store);
    }
  }, [store]);
  
  if (!storefront?.name) return null;
  return (
    <StorefrontLayout storefront={storefront}>
      <StorefrontCover 
        storefront={storefront} 
        handleClick={handleClick}
      />
      <Stack direction="column" spacing={'100px'}>
        { !storefront?.disableFeatures && (
          <StorefrontFeatures storefront={storefront} />
        )}
        { !storefront?.disableHowItWorks && (
          <StorefrontHowItWorks storefront={storefront} />
        )}
        <StorefrontFeaturedCollection handleClick={handleClick} storefront={storefront} />      
        { !storefront?.disablePhotos && (
          <StorefrontPhotos photos={photos} storefront={storefront} />
        )}
      </Stack>
    </StorefrontLayout>
  );
};

export default Storefront;
