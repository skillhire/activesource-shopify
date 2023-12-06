import React from "react";
import { Layout, AccountMenu } from "components";
import { Box, Stack, Container, Grid, Typography } from "@mui/material";

const AccountLayout = ({ title, children }) => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={sx.root}>
        <Grid container>
          <Grid item xs={4}>
            <Box>
              <AccountMenu />
            </Box>
          </Grid>
          <Grid item xs={8}>
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

export default AccountLayout;

const sx = {
  root: {
    py: 12,
  },
};
