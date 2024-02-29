import React from "react";
import { Alert, Cart, Header, Footer, MetaFields } from "components";
import { Box, Container } from "@mui/material";

export default function Layout({
  children,
  maxWidth,
  metaTitle = "Active Source Lab | Apparel for Fitness Studios",
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
        title={metaTitle}
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
        <Box sx={{ ...sx.container }}>
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
    mt: {
      sm: "64px",
      xs: "50px",
    },
    backgroundColor: "background.shade3",
  },
  disableScroll: {
    overflow: "hidden",
  },
};
