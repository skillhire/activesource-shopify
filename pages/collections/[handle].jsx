import React, { useState, useEffect } from "react";
import {
  Hidden,
  Button,
  Container,
  Grid,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  Layout,
  ProductCard,
  FilterButton,
  NoSearchResults,
  SearchTags,
  LoadMore,
} from "components";
import { useCollections, useSegment } from "hooks";
import { useRouter } from "next/router";
import {
  COLLECTION_SORT_OPTIONS,
  PRICE_RANGE_MIN,
  PRICE_RANGE_MAX,
} from "constants/shop";
import MobileFilterDrawer from "components/search/MobileFilterDrawer";
import MobileSortDrawer from "components/search/MobileSortDrawer";
import { Filter } from "lucide-react";
import { ExpandMore } from "@mui/icons-material";
import Sticky from "react-stickynode";
import { getMetaImage } from "utils";

const MobileFilterButtons = (props) => {
  const { setMobileSortOpen, setMobileOpen } = props || {};

  return (
    <Hidden smUp>
      <Box sx={sx.mobileButtons}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setMobileSortOpen(true)}
          endIcon={<ExpandMore />}
        >
          Sort By
        </Button>
      </Box>
    </Hidden>
  );
};

const DesktopFilterButtons = (props) => {
  const { handleSortClick, sortBy } = props || {};

  return (
    <Hidden smDown>
      <Box sx={sx.searchFilters}>
        <Box sx={sx.secondaryActions}>
          <Box sx={sx.filterText}>
            <Typography color="text.primary" variant="button">
              SORT BY:
            </Typography>
          </Box>
          <FilterButton
            label={sortBy?.label}
            handleClick={handleSortClick}
            options={COLLECTION_SORT_OPTIONS}
            value={sortBy?.sortKey}
            anchorHorizontal="right"
          />
        </Box>
      </Box>
    </Hidden>
  );
};

const Collection = (props) => {
  const router = useRouter();
  const { handle } = router.query;
  const [hero, setHero] = useState();
  const { trackProductList, trackProductClicked } = useSegment();

  // Mobile filter drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const [sticky, setSticky] = useState(false);

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

  const handleStickyChange = ({ status }) => {
    if (status == 2) {
      setSticky(true);
    } else {
      setSticky(false);
    }
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
    setHasNextPage,
    collection,
    products,
    fetchCollection,
  } = useCollections();

  const handleProductClick = (product) => {
    trackProductClicked(product);
    router.push(`/products/${product?.handle}`);
  };

  const handlePriceChange = (value) => {
    setHasNextPage(false);
    setPriceRange(value);
  };

  const handleSortClick = (option) => {
    setHasNextPage(false);
    setSortBy(option);
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

  const metaFields = {
    title: "Active Source",
    description: "Customize your apparell.",
  };

  return (
    <Layout title={metaFields.title} metaDescription={metaFields.description}>
      <AppBar
        elevation={0}
        sx={{
          ...sx.stickyBar,
          ...(sticky && sx.stickyBarVisible),
        }}
      >
        <Toolbar sx={sx.toolbar}>
          <Container sx={sx.container} maxWidth="lg">
            <MobileFilterButtons
              setMobileOpen={setMobileOpen}
              setMobileSortOpen={setMobileSortOpen}
            />
            <DesktopFilterButtons
              handleSortClick={handleSortClick}
              sortBy={sortBy}
            />
          </Container>
        </Toolbar>
      </AppBar>
      <Container sx={sx.container} maxWidth="lg">
        <Sticky enabled top={50} onStateChange={handleStickyChange}>
          <MobileFilterButtons
            setMobileOpen={setMobileOpen}
            setMobileSortOpen={setMobileSortOpen}
          />
          <DesktopFilterButtons
            handleSortClick={handleSortClick}
            sortBy={sortBy}
          />
        </Sticky>
      </Container>
      <Container sx={sx.container} maxWidth="lg">
        <SearchTags tags={materials} handleClearAll={handleClearAll} />
        <Box sx={sx.searchContainer}>
          <Grid container spacing={1}>
            {products &&
              products?.map((product, index) => (
                <Grid item xs={6} sm={6} md={3} lg={3} key={index}>
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
        <MobileSortDrawer
          open={mobileSortOpen}
          handleClose={() => setMobileSortOpen(false)}
          options={COLLECTION_SORT_OPTIONS}
          handleClick={handleSortClick}
          value={sortBy?.value}
          reverse={sortBy?.reverse}
        />
      </Container>
    </Layout>
  );
};

export default Collection;

const sx = {
  stickyBar: {
    p: 0,
    display: "none",
    top: "64px",
    backgroundColor: "common.white",
  },
  stickyBarVisible: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  toolbar: {
    p: 0,
    width: "100%",
  },
  container: {
    p: 0,
    px: 2,
  },
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
    backgroundColor: "common.white",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  filterText: {
    pb: 0.5,
    width: "70px",
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
  mobileButtons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    my: 2,
    backgroundColor: "common.white",
  },
  coverImageSkeleton: {
    height: { xs: 450, sm: 506 },
  },
};
