import React from "react";
import { Alert, Cart, Header, Footer, MetaFields } from "components";
import { Box, Container } from "@mui/material";

export default function Layout({
  children,
  maxWidth,
  title = "Active Source | Custom Men's Bands that Tell Your Story",
  metaDescription = "Discover Active Source's smarter way to customize and craft designs that reflect the story of your most important partnership",
  metaKeywords,
  metaImage,
  disableFooter = false,
  disableLoaders = false,
  disableScroll = false,
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
      <Header />
      <Cart />
      <Box
        sx={{
          ...sx.root,
          ...(disableScroll && sx.disableScroll),
        }}
      >
        <Box
          sx={{
            ...sx.container,
          }}
        >
          {maxWidth ? (
            <Container maxWidth={maxWidth}>{children}</Container>
          ) : (
            children
          )}
        </Box>
        {!disableFooter && (
          <Box sx={sx.footer}>
            <Footer />
          </Box>
        )}
      </Box>
    </>
  );
}

const sx = {
  root: {
    height: {
      sm: "calc(100vh-64px)",
      xs: "calc(100vh-50px)",
    },
    overflowX: "hidden",
  },
  footer: {
    minHeight: "440px",
  },
  container: {
    pt: {
      sm: "64px",
      xs: "50px",
    },
    minHeight: "calc(100vh - 440px)",
  },
  disableScroll: {
    overflow: "hidden",
  },
};
