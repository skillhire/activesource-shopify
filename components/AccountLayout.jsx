import React from "react";
import { Layout, LayoutMenu, LayoutMenuMobile } from "components";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";

import { ACCOUNT_MENU } from "constants/navigation";

const AccountLayout = ({ title, children, ...props }) => {
  return (
    <Layout {...props}>
      <Container maxWidth="lg" sx={sx.root}>
        <Grid container>
          <Grid item xs={3} sx={sx.menuItem}>
            <Box sx={sx.menuContainer}>
              <LayoutMenu items={ACCOUNT_MENU} />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Box sx={sx.mobileMenuItem}>
              <LayoutMenuMobile items={ACCOUNT_MENU} />
            </Box>
            <Stack spacing={4}>
              <Typography variant="h3">{title}</Typography>
              {children}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AccountLayout;

const sx = {
  root: {
    py: { xs: 6, sm: 6, md: 12 },
  },
  menuItem: {
    display: { xs: "none", sm: "none", md: "block" },
  },
  menuContainer: {
    pr: 4,
    width: "fit-content",
  },
  mobileMenuItem: {
    display: { xs: "block", sm: "block", md: "none" },
    mb: 2,
  },
};
