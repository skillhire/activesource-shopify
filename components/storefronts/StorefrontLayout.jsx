import React from "react";
import { Alert, Cart, MetaFields } from "components";
import { Box, Container } from "@mui/material";
import StorefrontFooter from "./StorefrontFooter";
import StorefrontHeader from "./StorefrontHeader";

export default function Layout({
  children,
  storefront,  
  ...props
}) {

  const { name, logo } = storefront;
  
  return (
    <>
      <MetaFields
        title={name}
      />
      <Alert />
      <Cart />
      <StorefrontHeader  
        logo={logo}
        name={name}
      />
      <Box
        sx={ sx.root}
      >
        <Box sx={ sx.container }>
          <Container maxWidth={'lg'}>
            {children}
          </Container>
        </Box>
        <StorefrontFooter 
          name={ name }
        />
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
  footer: {},
  container: {
    minHeight: 'calc(100vh - 164px)',
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
