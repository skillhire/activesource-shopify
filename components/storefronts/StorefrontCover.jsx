import React from "react";
import { Stack, Box, Typography } from "@mui/material";
import Image from "next/image";

const StorefrontCover = (props) => {
  const { storefront } = props || {};
  const { direction = "row" } = storefront || {};
  return (
    <Stack
      direction={{
        sm: direction == "row" ? "row-reverse" : "column",
        xs: "column",
      }}
      spacing={4}
      sx={sx.header}
    >
      <Box
        sx={{
          ...sx.imageContainer,
          width: direction == "row" ? 520 : "100%",
        }}
      >
        <Image
          src={storefront?.image}
          height={direction == "row" ? 520 : 330}
          width={direction == "row" ? 520 : 600}
          style={{
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          ...sx.content,
          ...(direction == "row" && sx.contentRow),
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            ...sx.title,
            ...(direction == "row" && sx.titleRow),
          }}
        >{storefront?.title}</Typography>
        <Typography variant="body2" sx={sx.description}>
          {storefront?.description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StorefrontCover;

const sx = {
  header: {
    py: 4,
    pt: 6,
    diplay: "flex",
    alignItems: "center",
    height: "100%",
  },
  description: {},
  imageContainer: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "100%",
    maxWidth: 720,
    pr: {
      sm: 4,
      xs: 0,
    },
    alignItems: {
      sm: "center",
      xs: "center",
    },
  },
  contentRow: {
    maxWidth: 520,
    pt: 4,
    alignItems: {
      sm: "flex-start",
      xs: "center",
    },
  },
  title: {
    textAlign: "center",    
  },
  titleRow: {
    textAlign: "left",
  },
};
