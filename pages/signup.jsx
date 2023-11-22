import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Box, Container } from "@mui/material";

import { SignUp, Layout } from "components";

import LoginHeroImage from "assets/login-hero-image@2x.png";

const Signup = () => {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/");
  };
  return (
    <Layout>
      <Box sx={sx.root}>
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={sx.root}>
            <Grid item xs={12} sm={12} md={6}>
              <Image src={LoginHeroImage} alt="Hero Image" priority width={450} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <SignUp onSuccess={handleSuccess} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default Signup;

const sx = {
  root: { mt: 6 },
};
