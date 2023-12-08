import React from "react";
import { Layout, CollectionMenu, CollectionMenuMobile } from "components";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";

const CollectionLayout = ({ title, children, ...props }) => {
  return (
    <Layout {...props}>
      <Container maxWidth="lg" sx={sx.root}>
        <Grid container>
          <Grid item xs={3} sx={sx.menuItem}>
            <Box sx={sx.menuContainer}>
              <CollectionMenu />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Stack spacing={4}>
              <Typography variant="h3">{title}</Typography>
              <Box sx={sx.mobileMenuItem}>
                <CollectionMenuMobile />
              </Box>
              {children}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CollectionLayout;

const sx = {
  root: {
    py: 12,
  },
  menuItem: {
    display: { xs: "none", sm: "none", md: "block" },
  },
  menuContainer: {
    pr: 4,
    width: "fit-content",
  },
  mobileMenuItem: {
    display: { xs: 'block', sm: 'block', md: 'none' },
  },
};
