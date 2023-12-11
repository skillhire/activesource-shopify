import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Stack, Typography, Button, Box, Container } from "@mui/material";
import { SHOP_ALL_URL } from "constants/navigation";

import HeroImage from "assets/hero-image@2x.png";

const SectionHeroPrimary = ({ home }) => {
  const router = useRouter();

  const handleClick = () => router.push(SHOP_ALL_URL);

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
                onClick={handleClick}
              >
                Explore Products
              </Button>
            </Box>
          </Stack>
          <Box sx={sx.imageContainer}>
            <Image
              src={HeroImage}
              alt="Hero Image"
              priority
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "primary.main",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: {
      lg: "space-between",
      sm: "center",
    },
    flexDirection: {
      lg: "row",
      md: "row",
      sm: "column",
      xs: "column",
    },
    pt: {
      sm: 5,
      xs: 4,
    },
    pb: {
      sm: 12,
      xs: 7,
    },
    flexWrap: "wrap",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
    minHeight: 550,
    width: "100%",
    height: "100%",
  },
  button: {
    width: {
      sm: "auto",
      xs: "100%",
    },
  },
};
