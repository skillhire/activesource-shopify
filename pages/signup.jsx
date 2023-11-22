import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, Box } from "@mui/material";

import { Logo, SignUp, Layout } from "components";

import LoginHeroImage from "assets/login-hero-image@2x.png";

const Signup = () => {
  const router = useRouter();
  const handleSuccess = () => {
    router.push("/");
  };
  return (
    <Layout sx={sx.root}>
      <Grid container sx={sx.root}>
        <Grid item xs={12} sm={12} md={6} sx={sx.imageContainer}>
          <Image src={LoginHeroImage} alt="Hero Image" priority width={450} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={sx.formContainer}>
          <Logo black />
          <Box sx={sx.form}>
            <SignUp onSuccess={handleSuccess} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Signup;

const sx = {
  root: {
    minHeight: {
      sm: "calc(100vh - 64px)",
      xs: "calc(100vh - 50px)",
    },
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "secondary.faded",
  },
  formContainer: {
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    pt: 4,
    width: "100%",
    maxWidth: 360,
  }
};
