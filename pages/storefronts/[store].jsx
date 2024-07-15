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

const Storefront = (props) => {
  const router = useRouter();
  const { store } = router.query;

  const { photos, storefront, fetchStorefront } = useStorefronts();

  const handleClick = () => {
    router.push(`/storefronts/${store}/collections/${storefront?.collection?.handle}`);
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
        <StorefrontFeatures storefront={storefront} />
        <StorefrontHowItWorks storefront={storefront} />
        <StorefrontFeaturedCollection handleClick={handleClick} storefront={storefront} />      
        <StorefrontPhotos photos={photos} storefront={storefront} />
      </Stack>
    </StorefrontLayout>
  );
};

export default Storefront;
