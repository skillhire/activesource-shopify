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
import { FOOTER_MENU, LEGAL_MENU } from "constants/navigation";

const Footer = ({ styles }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Logo />
          </Grid>
          <Grid item xs={12} sm={12} md={6} spacing={4}>
            <Grid container mb={2} spacing={4}>
              {Object.keys(FOOTER_MENU).map(footerMenuKey => (
                <Grid item xs={12} sm={12} md={4}>
                  <Box display="flex" justifyContent={{ md: "flex-end" }}>
                    <List dense disablePadding>
                      <ListItem disableGutters>
                        <ListItemText
                          primary={(
                            <Typography
                              variant="subtitle1"
                              sx={sx.footerHeader}
                            >
                              {footerMenuKey}
                            </Typography>
                          )}
                        />
                      </ListItem>
                      {FOOTER_MENU[footerMenuKey].map((menuItem, i) => (
                        <FooterMenuItem key={i} menuItem={menuItem} handleClick={handleClick} />
                      ))}
                    </List>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider light />
      <Container maxWidth="lg">
        <Box sx={sx.copyRights}>
          <Box>
            <Typography variant="overline" sx={sx.copyRightLabel}>
              © 2023 Active Source Lab
            </Typography>
          </Box>
          <Box sx={sx.copyRightsText}>
            <Box sx={sx.legalMenuItems}>
              {LEGAL_MENU.map((menuItem, i) => (
                <Button key={i} sx={sx.button} onClick={() => handleClick(menuItem.value)}>
                  <Typography variant="overline" sx={sx.copyRightLabel}>
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
    pt: { md: 10, sm: 6 },
  },
  footerHeader: {
    color: "primary.contrastText",
    textTransform: "capitalize",
  },
  button: {
    color: "common.white",
    textTransform: "none",
  },
  copyRights: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pt: 6,
    pb: { md: 6, sm: 6, xs: 6 }
  },
  copyRightsText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },
  copyRightLabel: {
    color: "primary.contrastText",
    textTransform: "none",
  },
  legalMenuItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "20px",
  },
};
