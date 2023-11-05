import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";

import { Logo, FooterMenuItem } from "components";
import { FOOTER_MENU } from "constants/navigation";

const Footer = ({ logo, shop, styles, ...props }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <Container maxWidth="lg">
        <Box sx={sx.footer}>
          <Box sx={{ ...sx.footerItem, ...sx.footerItemStart }}>
            <Logo />
          </Box>
          <Box sx={sx.footerItem}>
            <Grid container spacing={1} sx={sx.footerItemEnd}>
              <Grid item xs={12} sm={12} md={4}>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="primary.contrastText">
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
              <Grid item xs={12} sm={12} md={4}>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="primary.contrastText">
                          Services
                        </Typography>
                      }
                    />
                  </ListItem>
                  {FOOTER_MENU["services"].map((menuItem, i) => (
                    <FooterMenuItem
                      key={i}
                      menuItem={menuItem}
                      handleClick={handleClick}
                    />
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <List dense disablePadding>
                  <ListItem disableGutters>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="primary.contrastText">
                          Need Help?
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
          </Box>
        </Box>
      </Container>
      <Divider light />
      <Container maxWidth="lg">
        <Box sx={sx.copyRights}>
          <Box>
            <Typography variant="overline" color="primary.contrastText" sx={{ textTransform: "none" }}>
              © 2023 Active Source Lab
            </Typography>
          </Box>
          <Box sx={sx.copyRightsText}>
            <Box sx={sx.legalMenuItems}>
              {LEGAL_MENU.map((menuItem, i) => (
                <Button key={i} sx={sx.button} onClick={() => handleClick(menuItem.value)}>
                  <Typography variant="overline" sx={{ textTransform: "none" }}>
                    {menuItem.label}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box >
  );
};

export default Footer;

const sx = {
  root: {
    backgroundColor: "primary.main",
    pt: 10,
    pb: 6,
  },
  footer: {
    pb: 6,
    display: 'flex',
    flexWrap: 'wrap',
  },
  footerItem: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
  },
  footerItemStart: {
    justifyContent: 'flex-start',
  },
  footerItemEnd: {
    justifyContent: 'flex-end',
  },
  button: {
    color: "common.white",
    textTransform: "none",
  },
  copyRights: {
    display: "flex",
    justifyContent: "space-between",
    pt: 4,
  },
  copyRightsText: {
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
};
