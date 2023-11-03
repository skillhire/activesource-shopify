import React from "react";
import { useRouter } from "next/router";
import { Stack, Typography, Button, Box, Container } from "@mui/material";

const SectionHeroPrimary = (props) => {
  const { home } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push("/browse");
  };

  return (
    <Container maxWidth="lg" sx={sx.root}>
      <Stack sx={sx.container} spacing={2}>
        <Typography variant="h2" maxWidth={500} color="primary.contrastText">
          {home?.title}
        </Typography>
        <Typography variant="body1" color="primary.contrastText">
          {home?.subtitle}
        </Typography>
        <Box>
          <Button
            variant="contained" color="secondary">Explore Products</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    backgroundColor: "primary.main",
    minHeight: {
      sm: "calc(100vh - 64px)",
      xs: "calc(100vh - 50px)",
    },
  },
  container: {
    py: {
      sm: "80px",
      xs: 0,
    },
  },
};
