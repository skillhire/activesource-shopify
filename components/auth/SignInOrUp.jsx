import React from "react";
import Image from "next/image";
import { Grid, Box, Tabs, Tab, Stack } from "@mui/material";

import { Logo, SignIn, SignUp, Layout } from "components";

import LoginHeroImage from "assets/login-hero-image@2x.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const SignInOrUp = ({ onSuccess }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout sx={sx.root}>
      <Grid container sx={sx.root}>
        <Grid item xs={12} sm={12} md={6} sx={sx.imageContainer}>
          <Image src={LoginHeroImage} alt="Hero Image" priority width={450} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={sx.formContainer}>
          <Logo black />
          <Stack sx={sx.form} spacing={4}>
            <Box sx={sx.tabsContainer}>
              <Tabs value={value} onChange={handleChange} sx={sx.tabs}>
                <Tab label="log in" sx={sx.tab} />
                <Tab label="sign up" sx={sx.tab} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <SignIn onSuccess={onSuccess} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <SignUp onSuccess={onSuccess} />
            </CustomTabPanel>
          </Stack>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignInOrUp;

const sx = {
  root: {
    minHeight: {
      sm: "calc(100vh - 64px)",
      xs: "calc(100vh - 50px)",
    },
  },
  tab: { textTransform: "capitalize", flex: 1 },
  tabs: { width: "100%" },
  tabsContainer: {
    width: "100%",
    borderBottom: 1,
    borderColor: 'divider'
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
    mt: 4,
    width: "100%",
    maxWidth: 360,
    alignItems: "stretch",
    justifyContent: "center",
  }
};
