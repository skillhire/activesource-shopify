import React, { useState, useContext } from "react";
import { MobileMenuItem } from "components";
import { Fade, Box, List, ListItem } from "@mui/material";
import { ShopContext } from "context";
import { useRouter } from "next/router";
import { Close } from "@mui/icons-material";

import { MOBILE_MENU, LOGGED_MENU, UNLOGGED_MENU } from "constants/navigation";

const MobileMenu = ({ isLogged }) => {
  const router = useRouter();
  const [currentSubmenu, setCurrentSubmenu] = useState(undefined);
  const { menuOpen, setMenuOpen } = useContext(ShopContext);

  const handleClick = (menuItem) => {
    if (!menuItem.hasSubmenu) {
      router.push(menuItem.value);
      setMenuOpen(false);
    } else if (menuItem.hasSubmenu) {
      if (menuItem.value !== currentSubmenu) {
        setCurrentSubmenu(menuItem.value);
      } else {
        setCurrentSubmenu(undefined);
      }
    }
  };

  const renderMenu = (menu) => menu.map((menuItem, i) => (
    <>
      <MobileMenuItem key={i} menuItem={menuItem} handleClick={() => handleClick(menuItem)} isSubmenuOpen={currentSubmenu === menuItem.value} />
      {menuItem.hasSubmenu && menuItem.value === currentSubmenu && (menuItem.submenu.map((menuItem, i) => (
        <MobileMenuItem
          key={i}
          menuItem={menuItem}
          handleClick={() => handleClick(menuItem)}
          isSubItem
        />
      )))}
    </>
  ))

  return (
    <Fade in={menuOpen}>
      <Box sx={{ ...sx.drawer }}>
        <List sx={sx.header}>
          <ListItem sx={sx.header} onClick={() => setMenuOpen(false)}>
            <Close sx={{ color: "primary.main" }} />
          </ListItem>
        </List>
        <List>
          {renderMenu(MOBILE_MENU)}
          {isLogged && renderMenu(LOGGED_MENU)}
          {!isLogged && renderMenu(UNLOGGED_MENU)}
        </List>
      </Box>
    </Fade>
  );
}

export default MobileMenu;

const sx = {
  drawer: {
    zIndex: (theme) => theme.zIndex.drawer,
    position: "fixed",
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "secondary.light",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
};
