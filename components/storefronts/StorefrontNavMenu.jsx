import React from "react";
import { Link, Button, Box, Typography, Hidden, Stack, Toolbar } from "@mui/material";
import { CartButton, AuthIconButton } from "components";
import Image from "next/image";

const StorefrontDesktopMenu = ({ name, logo, imagesUrl, shopAllUrl, handleClick, handleLogoClick, ...props }) => {
  return (
    <Toolbar sx={sx.toolbar}>
      <Hidden mdDown>
        <Box sx={sx.root}>
          <Box sx={sx.item}>
            {logo ? (
              <Box
                sx={{
                  height: 60,
                  width: 80,
                }}
              >
                <Button 
                  disableRipple 
                  sx={sx.logoButton} 
                  onClick={handleLogoClick}
                >
                  <Image
                    src={logo}
                    layout="fill"
                    alt="logo"
                    style={{
                      maxWidth: 300,
                      width: '100%',
                      objectFit: "contain",
                    }}
                  />
                </Button>
              </Box>
            ) : (
              <Typography
                variant="h5"
                color="primary.contrastText"
                sx={sx.title}
              >
                {name}
              </Typography>
            )}
          </Box>
          <Box sx={sx.item}>
            <Stack direction="row" spacing={2}>
              <Link variant="body2" color='text.primary' href={shopAllUrl}>
                Shop All 
              </Link>
              { imagesUrl && (
                <Link variant="body2" color='text.primary' href={imagesUrl} target='_blank'>
                  Image Library 
                </Link>
              )}
            </Stack>
            <AuthIconButton color="#222222" />
            <CartButton color="#222222" />
          </Box>
        </Box>
      </Hidden>
      {/* mobile header: */}
      <Hidden mdUp>
        <Box sx={sx.root}>
          {/* <MenuToggleButton /> */}
          {logo ? (
            <Box
              sx={{
                height: 30,
                width: 80,
              }}
            >
              <Button 
                disableRipple 
                sx={sx.logoButton} 
                onClick={handleLogoClick}
              >
              <Image
                src={logo}
                height={50}
                width={120}
                layout="responsive"
                alt="logo"
              />
              </Button>
            </Box>
          ) : (
            <Typography variant="h5" color="text.primary" sx={sx.title}>
              {name}
            </Typography>
          )}
          <Box>
            <AuthIconButton color="#222222" />
            <CartButton color="#222222" />
          </Box>
        </Box>
      </Hidden>
    </Toolbar>
  );
};

export default StorefrontDesktopMenu;

const sx = {
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  toolbar: {
    width: "100%",
    maxWidth: "lg",
    margin: "0 auto",
    minHeight: "50px",
    height: {
      sm: "64px",
      xs: "50px",
    },
    bgcolor: "transparent !important",
  },
  logoButton: {    
    height: 60,
    minWidth: 260,    
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
};
