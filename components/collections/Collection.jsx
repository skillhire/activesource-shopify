import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Box, CardActionArea, Typography } from "@mui/material";
import { Image } from "components";

const Collection = ({ styles, collection, ...props }) => {
  const router = useRouter();

  const handleClick = () => router.push(`/collections/${collection.handle}`);

  return (
    <Box sx={sx.root}>
      <Box sx={sx.imageContainer}>
        <CardActionArea onClick={handleClick}>
          <Image fill src={collection?.image?.url} alt={collection.title} />
        </CardActionArea>
      </Box>
      <Box py={2} px={1}>
        <Typography gutterBottom variant="subtitle1">
          {collection.title.length > 80
            ? collection.title.slice(0, 80) + "..."
            : collection.title}
        </Typography>
      </Box>
    </Box>
  );
};

Collection.propTypes = {
  styles: PropTypes.object,
  collection: PropTypes.object.isRequired,
};

export default Collection;

const sx = {
  root: {},
  button: {
    p: 0,
  },
  imageContainer: {
    overflow: "hidden",
  },
};
