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
    <Container maxWidth="xl">
      <Stack sx={sx.root} spacing={2}>
        <Typography variant="h2" maxWidth={500}>{home?.title}</Typography>
        <Typography variant="body1">{home?.subtitle}</Typography>
        <Box>
          <Button variant="contained" color="secondary">Explore Products</Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default SectionHeroPrimary;

const sx = {
  root: {
    mt: {
      sm: "80px",
      xs: 0,
    },
  },
};
