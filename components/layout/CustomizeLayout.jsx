import React from "react";
import { Alert, Cart, MetaFields } from "components";
import { Box } from "@mui/material";

export default function CustomizeLayout({
  children,
  title = "Active Source | Custom Men's Bands that Tell Your Story",
  metaDescription = "Discover Active Source's smarter way to customize and craft designs that reflect the story of your most important partnership",
  metaKeywords,
  metaImage,
  ...props
}) {
  return (
    <>
      <MetaFields
        title={title}
        metaKeywords={metaKeywords}
        metaDescription={metaDescription}
      />
      <Alert />
      <Cart />
      <Box sx={sx.root}>
        <Box sx={sx.container}>{children}</Box>
      </Box>
    </>
  );
}

const sx = {
  root: {
    height: "calc(100vh)",
  },
  container: {
    height: "100%",
    overflow: "hidden",
  },
};
