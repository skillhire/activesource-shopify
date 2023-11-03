import React, { useState, useEffect } from "react";
import { useMenus } from "hooks";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  CardActionArea,
} from "@mui/material";
import { FooterMenuItem } from "components";
import { useRouter } from "next/router";
import Image from "next/image";
import { INSTAGRAM_URL } from "constants/shop";
import { EmailSubscribe } from "components";
import { FOOTER_MENU } from "constants/navigation";
import { Logo } from "components";

const FooterInstagram = ({ handleClick }) => {
  return (
    <Button sx={sx.button} onClick={() => handleClick(INSTAGRAM_URL)}>
      @Active Source Lab
    </Button>
  );
};

const FooterEmail = () => {
  return (
    <Box sx={sx.emailSubscribe}>
      <Typography mt={"18px"} variant="h6" sx={sx.header}>
        Subscribe
      </Typography>
      <EmailSubscribe />
    </Box>
  );
};

const Footer = ({ logo, shop, styles, ...props }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <Container maxWidth="xl">
        <Box sx={sx.content}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <Logo />
            </Grid>
            <Grid item xs={6} sm={12} md={3}>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={sx.header}>
                        Products
                      </Typography>
                    }
                  />
                </ListItem>
                {FOOTER_MENU["products"].map((menuItem, i) => (
                  <FooterMenuItem
                    key={i}
                    menuItem={menuItem}
                    handleClick={handleClick}
                  />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <List dense disablePadding>
                <ListItem disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={sx.header}>
                        SUPPORT
                      </Typography>
                    }
                  />
                </ListItem>
                {FOOTER_MENU["support"].map((menuItem, i) => (
                  <FooterMenuItem
                    key={i}
                    menuItem={menuItem}
                    handleClick={handleClick}
                  />
                ))}
              </List>
            </Grid>
          </Grid>
          <Box sx={sx.bottomFooter}>
            <Box sx={sx.bottomFooterText}>
              <Box sx={sx.legalMenuItems}>
                {FOOTER_MENU["legal"].map((menuItem, i) => (
                  <Button
                    sx={sx.button}
                    key={i}
                    onClick={() => handleClick(menuItem.value)}
                  >
                    {menuItem.label}
                  </Button>
                ))}
              </Box>
            </Box>
            <Button disableRipple sx={sx.button}>
              © 2023 Active Source Lab
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

const sx = {
  root: {
    px: {
      xs: 0,
      sm: "auto",
    },
    minHeight: "300px",
    backgroundColor: "primary.main",
  },
  content: {
    p: {
      xs: 0,
      sm: "auto",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    minHeight: "440px",
  },
  header: {
    textTransform: "uppercase",
    color: "common.white",
    mb: {
      xs: 0,
      sm: "50px",
    },
  },
  bottomFooter: {
    my: 2,
    height: "72px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    objectFit: "contain",
  },
  button: {
    color: "common.white",
  },
  bottomFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    justifyContent: {
      xs: "space-between",
      sm: "flex-end",
    },
  },
  emailSubscribe: {
    px: {
      sm: 2,
      xs: 0,
    },
  },
  bottomFooterText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },
  legalMenuItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },
  instaIcon: {
    marginBottom: "5px", // not sx
  },
  footerLogo: {
    width: "100%",
    textAlign: "center",
    pb: {
      xs: 5,
      sm: 0,
    },
  },
  divider: {
    display: {
      xs: "block",
      sm: "none",
    },
    borderTop: "1px solid",
    borderColor: "rgb(255,255,255,0.2)",
    height: "10px",
  },
  container: {
    width: "100%",
    px: {
      sm: 2,
      xs: 0,
    },
  },
};
