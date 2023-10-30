import { useState, useEffect } from "react";
import { useProducts, useSegment } from "hooks";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import {
  NoSearchResults,
  SearchInput,
  Layout,
  LoadMore,
  ProductGrid,
} from "components";
import { PER_PAGE } from "constants/shop";

const Search = () => {
  const router = useRouter();
  const { trackProductsSearched } = useSegment();

  let { query } = router.query;
  if (query == "all") query = "";

  const [keywords, setKeywords] = useState(query?.toUpperCase());
  const first = PER_PAGE;

  const { loading, error, cursor, hasNextPage, products, fetchProducts } =
    useProducts();

  const handleChange = (ev) => {
    setKeywords(ev.target.value?.toUpperCase());
    if (keywords?.length == 0) {
      handleSearch("");
    }
  };

  const handleSearch = (keywords) => {
    if (keywords?.length > 0) {
      trackProductsSearched(keywords);
    }
    router.push(`/search/${keywords.split(" ").join("-")}`);
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key == "Enter" && keywords) {
      handleSearch(keywords);
    }
  };

  const handleLoadMore = (after) => {
    fetchProducts({
      query: `${keywords} tag_not:hidden`,
      first: first,
      after,
    });
  };

  useEffect(() => {
    if (query) {
      let searchKeywords = decodeURI(query)?.split("-")?.join(" ");
      setKeywords(searchKeywords?.toUpperCase());
      fetchProducts({
        query: `${searchKeywords} tag_not:hidden`,
        first: first,
      });
    }
  }, [query]);

  return (
    <Layout title={"Search"}>
      <Container maxWidth="lg">
        <Box sx={sx.page}>
          <Box sx={sx.container}>
            <Box sx={sx.searchInput}>
              <SearchInput
                value={keywords}
                handleChange={handleChange}
                handleSearch={handleSearch}
                handleKeyPress={handleKeyPress}
                placeholder={"SEARCH BY COLLECTION NAME, MATERIAL, ETC."}
              />
            </Box>
          </Box>
          {products?.length > 0 && <ProductGrid products={products} />}

          {!loading && (!products || products?.length == 0) && (
            <NoSearchResults />
          )}

          <LoadMore
            loading={loading}
            hasNextPage={hasNextPage}
            handleSearch={() => handleLoadMore(cursor)}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default Search;

const sx = {
  root: {},
  page: {
    p: {
      xs: 2,
      sm: 8,
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    pt: 6,
    pb: 2,
    px: 2,
  },
  searchInput: {
    width: "100%",
    maxWidth: "670px",
    mb: 8,
  },
};
