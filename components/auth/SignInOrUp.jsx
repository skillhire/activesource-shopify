import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
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

export const SIGNIN_OR_SIGNUP_TABS = [
  {
    tab: "login",
    url: "/login",
    label: "Log In",
  },
  {
    tab: "signup",
    url: "/signup",
    label: "Sign Up",
  },
];

const SignInOrUp = ({ tab, onSuccess }) => {
  const router = useRouter();
  const currentTabIndex = SIGNIN_OR_SIGNUP_TABS.map((e) => e.tab).indexOf(tab);
  const value = currentTabIndex > 0 ? currentTabIndex : 0;

  const handleChange = (event, newValue) => {
    const currentValueUrl = SIGNIN_OR_SIGNUP_TABS[newValue].url;
    router.push(currentValueUrl);
  };

  return (
    <Layout sx={sx.root}>
      <Grid container sx={sx.root}>
        <Grid item xs={12} sm={12} md={6} sx={sx.imageContainer}>
          <Image src={LoginHeroImage} alt="Hero Image" priority height={560} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={sx.formContainer}>
          <Logo black />
          <Stack sx={sx.form} spacing={4}>
            <Box sx={sx.tabsContainer}>
              <Tabs value={value} onChange={handleChange} sx={sx.tabs}>
                {SIGNIN_OR_SIGNUP_TABS.map((t) => (
                  <Tab key={t.tab} label={t.label} sx={sx.tab} />
                ))}
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
    borderColor: "divider",
  },
  imageContainer: {
    display: { xs: "none", sm: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "common.faded",
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
  },
};
