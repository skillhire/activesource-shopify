import React from "react";
import { Layout, CollectionMenu } from "components";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";

const ConnectionLayout = ({ title, children, ...props }) => {
  return (
    <Layout {...props}>
      <Container maxWidth="lg" sx={sx.root}>
        <Grid container>
          <Grid item xs={3}>
            <Box sx={sx.menuContainer}>
              <CollectionMenu />
            </Box>
          </Grid>
          <Grid item xs={9}>
            <Stack>
              <Typography variant="h3" mb={6}>{title}</Typography>
              {children}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ConnectionLayout;

const sx = {
  root: {
    py: 12,
  },
  menuContainer: {
    width: "fit-content"
  }
};
