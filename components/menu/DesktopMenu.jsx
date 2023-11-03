import React, { useState } from "react";
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
  const [expandMore, setExpandMore] = useState(true);

  return (
    <>
      <Toolbar sx={sx.toolbar}>
        <Box sx={sx.root}>
          <Box sx={sx.leftColumn}>
            <MenuToggleButton />
            <Logo />
            <Hidden mdDown>
              {DESKTOP_MENU.map((menuItem, index) => (
                <DesktopMenuItem
                  key={index}
                  menuItem={menuItem}
                  handleClick={handleClick}
                />
              ))}
            </Hidden>
          </Box>
          <Box sx={sx.rightColumn}>
            <SearchModal />
            <CartButton />
          </Box>
        </Box>
      </Toolbar>
    </>
  );
};

export default DesktopMenu;

const sx = {
  toolbar: {
    minHeight: "50px",
    height: {
      sm: "64px",
      xs: "50px",
    },
    backgroundColor: "transparent",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftColumn: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightColumn: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
};
