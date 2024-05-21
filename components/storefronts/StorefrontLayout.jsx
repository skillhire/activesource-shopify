import React from "react";
import { Alert, Cart, MetaFields } from "components";
import { Box, Container } from "@mui/material";
import StorefrontFooter from "./StorefrontFooter";
import StorefrontHeader from "./StorefrontHeader";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "theme";
import { createTheme } from "@mui/material/styles";

export default function Layout({ children, storefront, ...props }) {
  const { name } = storefront || {};

  const customTheme = {
    ...muiTheme,
    palette: {
      ...muiTheme.palette,
      secondary: {
        main: '#000000'
      },
    }
  }


  return (
    <ThemeProvider 
      theme={createTheme(customTheme)}
    >
        <MetaFields title={name} />
        <Alert />
        <Cart />
        <StorefrontHeader storefront={storefront} />
        <Box sx={sx.root}>
          <Box sx={sx.container}>
            <Container maxWidth={"lg"}>{children}</Container>
          </Box>
          <StorefrontFooter name={name} />
        </Box>
    </ThemeProvider>
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
    minHeight: "calc(100vh - 164px)",
    mt: {
      sm: "64px",
      xs: "50px",
    },
    backgroundColor: "background.shade3",
    pb: 6
  },
  disableScroll: {
    overflow: "hidden",
  },
};
