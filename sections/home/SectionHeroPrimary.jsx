import React from "react";
import Image from "next/image";
import { Stack, Typography, Button, Box, Container } from "@mui/material";

import HeroImage from "assets/hero-image@2x.png";

const SectionHeroPrimary = (props) => {
  const { home } = props;

  return (
    <Box sx={sx.root}>
      <Container maxWidth="lg">
        <Box sx={sx.container}>
          <Stack spacing={3}>
            <Typography
              variant="h2"
              component="h1"
              maxWidth={500}
              color="primary.contrastText"
            >
              {home?.title}
            </Typography>
            <Typography variant="body1" color="primary.contrastText">
              {home?.subtitle}
            </Typography>
            <Box pt={2}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={sx.button}
              >
                Explore Products
              </Button>
            </Box>
          </Stack>
          <Image src={HeroImage} alt="Hero Image" priority width={450} />
        </Box>
      </Container>
    </Box>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "primary.main",
    minHeight: {
      sm: "calc(100vh - 64px)",
      xs: "calc(100vh - 50px)",
    },
    textAlign: {
      sm: "left",
      xs: "center",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: {
      lg: "space-between",
      sm: "center",
    },
    pt: {
      sm: 6,
      xs: 6,
    },
    pb: {
      sm: 12,
      xs: 6,
    },
    flexWrap: "wrap",
  },
  button: {
    width: {
      sm: "auto",
      xs: "100%",
    },
  },
};
