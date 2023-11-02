import React from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, Container } from "@mui/material";

const SectionHeroPrimary = (props) => {
  const { home } = props;
  const router = useRouter();

  const handleClick = () => {
    router.push("/browse");
  };

  return (
    <Container maxWidth="xl">
      <Box sx={sx.root}>
        <Typography variant="h2" maxWidth={500}>{home?.title}</Typography>
        <Typography variant="body1" my={2}>{home?.subtitle}</Typography>
        <Button variant="contained" color="secondary">Explore Products</Button>
      </Box>
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
