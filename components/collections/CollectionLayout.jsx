import React from "react";
import { Layout, LayoutMenu, LayoutMenuMobile } from "components";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";

const CollectionLayout = ({ 
  title, 
  description,
  menuItems={}, 
  children, 
  ...props 
}) => {
  
  return (
      <Container maxWidth="lg" sx={sx.root}>
        <Grid container>
          <Grid item xs={3} sx={sx.menuItem}>
            <Box sx={sx.menuContainer}>
              <LayoutMenu items={menuItems} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Stack spacing={4}>
              <Typography variant="h3">{title}</Typography>
              { description && (
                <Typography variant="body1">
                  { description }
                </Typography>
              )}
              <Box sx={sx.mobileMenuItem}>
                <LayoutMenuMobile items={menuItems} />
              </Box>
              {children}
            </Stack>
          </Grid>
        </Grid>
      </Container>    
  );
};

export default CollectionLayout;

const sx = {
  root: {
    py: { xs: 6, sm: 6, md: 6 },
  },
  menuItem: {
    display: { xs: "none", sm: "none", md: "block" },
  },
  menuContainer: {
    pt: "64px",
    pr: 4,
    width: "fit-content",
  },
  mobileMenuItem: {
    display: { xs: "block", sm: "block", md: "none" },
  },
};
