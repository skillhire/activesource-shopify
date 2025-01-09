import React, { useState, useMemo, useEffect } from "react";
import { Grid, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import {
  Layout,
  CollectionLayout,
  ProductCard,
  NoSearchResults,  
  LoadMore,
} from "components";
import { useCollections, useSegment } from "hooks";
import { COLLECTIONS_MENU } from "constants/navigation";
import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from "constants/shop";

import SectionEnterpriseSolutions from "sections/collections/SectionEnterpriseSolutions";

const Collection = () => {
  const router = useRouter();
  const { handle } = router.query;
  const { trackProductList, trackProductClicked } = useSegment();

  // Search options  
  const priceRange = [
    PRICE_RANGE_MIN,
    PRICE_RANGE_MAX,
  ];  

  const [sortBy, _setSortBy] = useState({
    label: "Collection",
    value: "COLLECTION_DEFAULT",
    reverse: false,
  });

  const {
    loading,
    cursor,
    hasNextPage,
    collection,
    products,
    fetchCollection,
  } = useCollections();

  const handleProductClick = (product) => {
    trackProductClicked(product);
    router.push(`/products/${product?.handle}`);
  };

  const handleSearch = (after) => {
    const first = 48;
    let filters = [];

    const { value, reverse } = sortBy;

    if (priceRange) {
      filters.push({
        price: {
          min: priceRange[0],
          max: priceRange[1],
        },
      });
    }

    fetchCollection(handle, {
      first,
      filters,
      sortKey: value,
      reverse,
      after,
    });
  };

  useEffect(() => {
    if (handle) {
      handleSearch();
    }
  }, [handle, sortBy]);

  useEffect(() => {
    if (collection) {
      trackProductList(collection);
    }
  }, [collection]);

  const currentCollection = useMemo(() => {
    return COLLECTIONS_MENU.find((c) => c.handle === handle);
  }, [handle]);

  return (
    <Layout title={currentCollection?.label}>
    <CollectionLayout       
      title={currentCollection?.label}
      description="Your branded apparel is just a few clicks away—select your products, upload your artwork, and finalize your order."
      menuItems={{ "Shop All": COLLECTIONS_MENU }}
    >
      <Box sx={sx.searchContainer}>
        <Grid
          container
          rowSpacing={{ xs: 3, sm: 3, md: 7 }}
          columnSpacing={{ xs: 3, sm: 3, md: 5 }}
        >
          {products?.map((product, index) => (
            <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
              <ProductCard
                product={product}
                handleClick={() => handleProductClick(product)}
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
          handleSearch={() => handleSearch(cursor)}
        />
      </Box>
      <Box mt={"100px"} />
      <SectionEnterpriseSolutions />
    </CollectionLayout>
    </Layout>
  );
};

export default Collection;

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
