import React, { useState, useEffect } from "react";
import { useStorefronts, useCollections } from "hooks";
import {  
  StorefrontLayout,
} from "components";
import {
  CollectionLayout,
  ProductCard,
  NoSearchResults,  
  LoadMore,
} from "components";
import { Box, Grid, CircularProgress, Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { buildStorePath } from "utils";

const StorefrontShopAll = (props) => {
  const router = useRouter();
  let { store, handle } = router.query;
  if(handle == 'index') handle = null;

  const { photos, storefront, fetchStorefront } = useStorefronts();

  const [menuItems, setMenuItems] = useState([]);
  
  const {
    loading,
    cursor,
    hasNextPage,
    collection,
    products,
    fetchCollection,
  } = useCollections();
  
  const handleSearch = (handle, cursor = null) => {
    fetchCollection(handle, {
      first: 12,
      filters: [],
      sortKey: 'COLLECTION_DEFAULT',
      reverse: false,
      after: cursor,
    });
  };

  useEffect(() => {
    if (store) {
      fetchStorefront(store);
    }
  }, [store]);

  useEffect(() => {
    if(store && storefront?.collections?.length > 0) {            
      setMenuItems(storefront?.collections?.map((collection) => ({
        label: collection.title,
        value: buildStorePath(store, `/collections/${collection.handle}`),
      })));
    }
  }, [store, storefront]);

  useEffect(() => {
    if(handle){
      handleSearch(handle);
    }    
  }, [handle]);

  if (!storefront?.name) return null;
  return (
    <StorefrontLayout storefront={storefront}>
      <CollectionLayout 
        title="Shop All"       
        menuItems={ menuItems }
      >
      <Box sx={sx.searchContainer}>
        <Grid
          container
          spacing={2}
        >
          {products?.map((product, index) => (
            <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
              <ProductCard
                product={product}                
                productUrl={ buildStorePath(store, `/products`)}
              />
            </Grid>
          ))}
          {loading && (
            <Box sx={sx.placeholder}>
              <CircularProgress disableShrink size={32} />
            </Box>
          )}
        </Grid>
        {!loading && products?.length == 0 && (
          <Box my={10}>
            <NoSearchResults />
          </Box>
        )}
        <LoadMore
          loading={loading}
          hasNextPage={hasNextPage}
          handleSearch={() => handleSearch(collection?.handle, cursor)}
        />
      </Box>      
    </CollectionLayout>
    </StorefrontLayout>
  );
};

export default StorefrontShopAll;


const sx = {
  container: {
    p: 2,
  },
  searchContainer: {
    minHeight: 400,
    mb: 12,
  },
  placeholder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 400,
    width: "100%",
    height: "100%",
  },
};
