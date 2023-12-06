import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useRouter } from "next/router";

import {
  CollectionLayout,
  ProductCard,
  NoSearchResults,
  SearchTags,
  LoadMore,
} from "components";
import { useCollections, useSegment } from "hooks";
import {
  PRICE_RANGE_MIN,
  PRICE_RANGE_MAX,
} from "constants/shop";
import { getMetaImage } from "utils";

const Collection = (props) => {
  const router = useRouter();
  const { handle } = router.query;
  const [hero, setHero] = useState();
  const { trackProductList, trackProductClicked } = useSegment();

  // Search options
  const [materials, setMaterials] = useState([]);
  const [priceRange, setPriceRange] = useState([
    PRICE_RANGE_MIN,
    PRICE_RANGE_MAX,
  ]);

  const handleClearAll = () => {
    setMaterials([]);
    setPriceRange([PRICE_RANGE_MIN, PRICE_RANGE_MAX]);
  };

  const [sortBy, setSortBy] = useState({
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
      setHero({
        title: "Shop from the bands below",
        subtitle: "or try on five of our sample bands at home.",
        desktopImage: collection?.image?.url,
        mobileImage: getMetaImage(collection, "mobile_image"),
      });
    }
  }, [collection]);


  return (
    <CollectionLayout title="Shop All">
      <SearchTags tags={materials} handleClearAll={handleClearAll} />
      <Box sx={sx.searchContainer}>
        <Grid container spacing={1}>
          {products &&
            products?.map((product, index) => (
              <Grid item xs={6} sm={6} md={4} lg={4} key={index}>
                <ProductCard
                  product={product}
                  handleClick={() => handleProductClick(product)}
                />
              </Grid>
            ))}
        </Grid>
        {!loading && (!products || products?.length == 0) && (
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
    </CollectionLayout>
  );
};

export default Collection;

const sx = {
  container: {
    p: 2,
  },
  searchContainer: {
    minHeight: 400,
  },
};
