import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import {
  CoverImage,
  Layout,
  ProductCard,
  FilterButton,
  PriceFilterButton,
  NoSearchResults,
  SearchTags,
  LoadMore,
} from "components";
import { useProducts } from "hooks";
import { useRouter } from "next/router";
import {
  PRODUCT_SORT_OPTIONS,
  PRICE_RANGE_MIN,
  PRICE_RANGE_MAX,
  PER_PAGE,
} from "constants/shop";

const Browse = (props) => {
  const first = PER_PAGE;
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [priceRange, setPriceRange] = useState([
    PRICE_RANGE_MIN,
    PRICE_RANGE_MAX,
  ]);

  const [sortBy, setSortBy] = useState({
    label: "Recommended",
    sortKey: "RELEVANCE",
    reverse: false,
  });

  const {
    loading,
    cursor,
    hasNextPage,
    setHasNextPage,
    products,
    fetchProducts,
  } = useProducts();

  const handleProductClick = (product) => {
    router.push(`/products/${product?.handle}`);
  };

  const handlePriceChange = (value) => {
    setHasNextPage(null);
    setPriceRange(value);
  };

  const handleSortClick = (option) => {
    setHasNextPage(null);
    setSortBy(option);
  };

  const handleSearch = (after) => {
    const { sortKey, reverse } = sortBy;
    let query = [];
    if (tags) {
      query.push(tags.map((m) => `"${m}"`).join(" OR "));
    }
    if (priceRange) {
      query.push(
        `variants.price:>=${priceRange[0]} AND variants.price:<=${priceRange[1]}`
      );
    }
    let productsQuery = query.join(" AND ");
    fetchProducts({
      query: productsQuery,
      first,
      sortKey,
      reverse,
      after,
    });
  };

  const handleTagClick = (material) => {
    setHasNextPage(null);
    if (tags?.includes(material)) {
      setTags(tags?.filter((m) => m !== material));
    } else {
      setTags([...tags, material]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [tags, priceRange, sortBy]);

  return (
    <Layout metaTitle="ActiveSource | Browse">
      <Container maxWidth="lg">
        <Box sx={sx.searchFilters}>
          <Box sx={sx.primaryActions}>
            <Typography sx={sx.filterText} variant="button">
              FILTER BY:
            </Typography>
            <PriceFilterButton
              label="Price"
              handleChange={handlePriceChange}
              value={priceRange}
              minPrice={PRICE_RANGE_MIN}
              maxPrice={PRICE_RANGE_MAX}
            />
          </Box>
          <Box sx={sx.secondaryActions}>
            <Box sx={sx.filterText}>
              <Typography variant="button">SORT BY:</Typography>
            </Box>
            <FilterButton
              label={sortBy?.label}
              handleClick={handleSortClick}
              options={PRODUCT_SORT_OPTIONS}
              value={sortBy?.sortKey}
            />
          </Box>
        </Box>
        <SearchTags tags={tags} handleClick={handleTagClick} />
        <Box sx={sx.searchContainer}>
          <Grid container spacing={1}>
            {products?.map((product, index) => (
              <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
                <ProductCard
                  product={product}
                  handleClick={handleProductClick}
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
      </Container>
    </Layout>
  );
};

export default Browse;

const sx = {
  searchContainer: {
    minHeight: 400,
    pb: 10,
  },
  searchFilters: {
    my: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  filterText: {
    pb: 0.5,
    width: "70px",
    whiteSpace: "nowrap",
  },
  primaryActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  secondaryActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  heroContainer: {
    p: 4,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "500px",
  },
  loadMoreContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    my: 5,
  },
};
