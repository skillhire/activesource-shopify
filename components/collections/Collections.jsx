import { useEffect } from "react";
import { useCollections } from "hooks";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

import { CollectionCarousel, CollectionGrid } from "components";

const Collections = ({ styles, variant = "carousel", ...props }) => {
  const { loading, collections, fetchCollections } = useCollections();

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <Box sx={sx.root}>
      <Typography variant="h6">Collections</Typography>
      {variant == "carousel" && (
        <CollectionCarousel loading={loading} collections={collections} />
      )}
      {variant == "grid" && (
        <CollectionGrid loading={loading} collections={collections} />
      )}
    </Box>
  );
};

Collections.propTypes = {
  styles: PropTypes.object,
  variant: PropTypes.oneOf(["carousel", "grid"]),
};

export default Collections;

const sx = {
  root: {},
};
