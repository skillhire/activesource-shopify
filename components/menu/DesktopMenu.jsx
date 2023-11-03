import React from "react";
import { Box, Hidden, Toolbar } from "@mui/material";
import {
  Logo,
  MenuToggleButton,
  CartButton,
  SearchModal,
  DesktopMenuItem,
} from "components";
import { DESKTOP_MENU } from "constants/navigation";

const DesktopMenu = ({ logo, handleClick, ...props }) => {
  return (
    <Toolbar sx={sx.toolbar}>
      <Hidden mdDown>
        <Box sx={sx.root}>
          <Box sx={sx.item}>
            <Logo />
            {DESKTOP_MENU.map((menuItem, index) => (
              <DesktopMenuItem
                key={index}
                menuItem={menuItem}
                handleClick={handleClick}
              />
            ))}
          </Box>
          <Box sx={sx.item}>
            <SearchModal />
            <CartButton />
          </Box>
        </Box>
      </Hidden>
      {/* mobile header: */}
      <Hidden mdUp>
        <Box sx={sx.root}>
          <MenuToggleButton />
          <Logo />
          <CartButton />
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
