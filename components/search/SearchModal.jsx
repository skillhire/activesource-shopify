import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { NoSearchResults, ProductItem, SearchInput } from "components";
import {
  SwipeableDrawer,
  Container,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { PER_PAGE } from "constants/shop";
import { ShopContext } from "context";
import { useProducts, useSegment } from "hooks";
import { Close } from "@mui/icons-material";
import { Search } from "lucide-react";
import Image from "next/image";

const SearchModal = ({ styles, ...props }) => {
  const MIN_ANALYTICS_CHARS = 5; // Minimum number of characters to track analytics

  const router = useRouter();
  const { trackProductsSearched } = useSegment();
  const { setMenuOpen } = useContext(ShopContext);

  const [expanded, setExpanded] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const { loading, error, products, setProducts, fetchProducts } =
    useProducts();

  const handleSearchClick = () => {
    setMenuOpen(false);
    setSearchOpen(!searchOpen);
  };

  const handleChange = (ev) => setKeywords(ev.target.value?.toUpperCase());

  const handleSubmit = () => {
    handleClose();
    router.push(`/search/${keywords.split(" ").join("-")}`);
  };

  const handleClick = (product) => {
    setMenuOpen(false);
    setKeywords("");
    setSearchOpen(false);
    setExpanded(false);
    router.push(`/products/${product.handle}`);
  };

  const handleClose = () => {
    handleClear();
    setMenuOpen(false);
    setSearchOpen(false);
    setProducts(null);
    setExpanded(false);
  };

  const handleClear = () => setKeywords("");

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key == "Enter" && keywords) {
      handleClose();
      handleSubmit();
    }
  };

  const handleSearch = () => {
    if (keywords?.length >= MIN_ANALYTICS_CHARS) {
      trackProductsSearched(keywords);
    }
    setExpanded(true);
    fetchProducts({
      query: `${keywords} AND tag_not:hidden`,
      sortKey: "RELEVANCE",
      first: PER_PAGE,
      tag_not: "hidden",
    });
  };

  useEffect(() => {
    if (keywords?.length > 0) {
      handleSearch();
    } else {
      setProducts(null);
      setExpanded(false);
    }
  }, [keywords]);

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <IconButton sx={sx.iconButton} size="small" onClick={handleSearchClick}>
        <Search height={20} width={20} color="white" />
      </IconButton>
      <SwipeableDrawer open={searchOpen} anchor="top" onClose={handleClose}>
        <Box
          sx={{
            ...sx.container,
            ...(expanded && sx.expandedModal),
          }}
        >
          <Box sx={sx.closeButton}>
            <IconButton onClick={handleClose}>
              <Close sx={sx.closeIcon} />
            </IconButton>
          </Box>
          <Box sx={sx.searchInput}>
            <SearchInput
              value={keywords}
              handleClear={handleClear}
              handleChange={handleChange}
              handleSearch={handleSubmit}
              handleKeyPress={handleKeyPress}
              placeholder={"Search ..."}
            />
          </Box>
          <Container maxWidth="lg">
            <Box sx={sx.searchResults}>
              <Grid container spacing={2}>
                {products &&
                  products.map((product) => (
                    <Grid item xs={6} md={3} key={product.id}>
                      <ProductItem
                        product={product}
                        handleClick={handleClick}
                      />
                    </Grid>
                  ))}
              </Grid>
              {keywords?.length > 0 && !loading && products?.length == 0 && (
                <NoSearchResults />
              )}
            </Box>
          </Container>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

SearchModal.propTypes = {
  className: PropTypes.string,
};

export default SearchModal;

const sx = {
  container: {
    width: "100vw",
    height: {
      xs: "240px",
      sm: "316px",
    },
    width: "100vw",
    backgroundColor: "common.white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "all 0.2s ease-in-out",
    overflowY: "scroll",
  },
  expandedModal: {
    height: "90vh",
  },
  searchInput: {
    px: 2,
    my: {
      xs: "30px",
      sm: "90px",
    },
    width: "100%",
    maxWidth: "670px",
  },
  iconButton: {
    mt: "6px",
  },
  closeButton: {
    mt: 3,
    mr: 6,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  closeIcon: {
    color: "primary.main",
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  searchResults: {
    mb: 5,
  },
};
