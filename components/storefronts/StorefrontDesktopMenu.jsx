import React from "react";
import { Box, Typography, Hidden, Toolbar } from "@mui/material";
import {
  Logo,
  CartButton,
  AuthIconButton,
  MenuToggleButton,
} from "components";
import Image from 'next/image'

const DesktopMenu = ({ name, logo, handleClick, ...props }) => {
  return (
    <Toolbar sx={sx.toolbar}>
      <Hidden mdDown>
        <Box sx={sx.root}>
          <Box sx={sx.item}>
            { logo ? 
              <Image src={ logo } height={30} width={120} layout="responsive" alt="logo" /> : 
              <Typography variant="h5" color="primary.contrastText" sx={ sx.title }>
                { name } 
              </Typography>
            }            
          </Box>
          <Box sx={sx.item}>
            <AuthIconButton />
            <CartButton />
          </Box>
        </Box>
      </Hidden>
      {/* mobile header: */}
      <Hidden mdUp>
        <Box sx={sx.root}>
          { /* <MenuToggleButton /> */ }
          { logo ? 
              <Image src={ logo } height={30} width={120} layout="responsive" alt="logo" /> : 
              <Typography variant="h5" color="primary.contrastText" sx={ sx.title }>
                { name } 
              </Typography>
            }   
          <Box>
            <AuthIconButton />
            <CartButton />
          </Box>
        </Box>
      </Hidden>
    </Toolbar>
  );
};

export default DesktopMenu;

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
    backgroundColor: "transparent",
  },
};
