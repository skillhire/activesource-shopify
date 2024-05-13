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
        <Stack direction={{ sm: "row", xs: "column" }} spacing={1}>
          <Stack spacing={2} sx={sx.leftPanel}>
            <Typography variant="h2" color="primary.contrastText">
              {home?.title}
            </Typography>
            <Typography variant="body1" color="primary.contrastText">
              {home?.subtitle}
            </Typography>
            <Typography
              variant="body2"
              color="primary.contrastText"
              sx={sx.description}
            >
              {home?.description}
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
          <Box sx={sx.rightPanel}>
            <Image
              src={HeroImage}
              alt="Hero Image"
              priority
              layout="responsive"
              style={{
                objectFit: "contain",
                maxHeight: "500px",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    backgroundColor: "primary.main",
  },
  leftPanel: {
    py: {
      sm: 0,
      xs: 6,
    },
    width: {
      sm: "50%",
      xs: "100%",
    },
    justifyContent: "center",
  },
  rightPanel: {
    pb: {
      sm: 0,
      xs: 4,
    },
    flex: 1,
    width: {
      sm: "50%",
      xs: "100%",
    },
    minHeight: {
      sm: 550,
      xs: "none",
    },
    width: "100%",
    height: "100%",
  },
  button: {
    width: {
      sm: "auto",
      xs: "100%",
    },
  },
  description: {
    whiteSpace: "pre-line",
  },
};
