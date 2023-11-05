import React, { useState, useContext } from "react";
import { MobileMenuItem } from "components";
import { Fade, Box, List } from "@mui/material";
import { ShopContext } from "context";
import { useRouter } from "next/router";

import { MOBILE_MENU, SHOP_ALL_MENU, SHOP_ALL_URL } from "constants/navigation";

const MobileMenu = () => {
  const router = useRouter();
  const [showShopAll, setShowShopAll] = useState(false);
  const { menuOpen, setMenuOpen } = useContext(ShopContext);

  const handleClick = (menuItem) => {
    if (menuItem.value !== SHOP_ALL_URL) {
      router.push(menuItem.value);
      setMenuOpen(false);
    } else if (menuItem?.value === SHOP_ALL_URL) {
      setShowShopAll(!showShopAll);
    }
  };

  return (
    <Fade in={menuOpen}>
      <Box sx={{ ...sx.drawer }}>
        <List sx={sx.list}>
          {MOBILE_MENU.map((menuItem, i) => (
            <>
              <MobileMenuItem key={i} menuItem={menuItem} handleClick={() => handleClick(menuItem)} isSubMenuOpen={showShopAll} />
              {menuItem.value === SHOP_ALL_URL && SHOP_ALL_MENU.map((menuItem, i) => (
                <MobileMenuItem
                  key={i}
                  menuItem={menuItem}
                  isSubItem
                  handleClick={() => handleClick(menuItem)}
                  hide={!showShopAll}
                />
              ))}
            </>
          ))}
        </List>
      </Box>
    </Fade>
  );
};

export default MobileMenu;

const sx = {
  drawer: {
    zIndex: (theme) => theme.zIndex.drawer,
    width: "100vw",
    position: "fixed",
    top: "50px",
    height: "calc(100vh - 50px)",
    left: 0,
    width: "100vw",
    backgroundColor: "primary.main",
  },
  list: {
    p: 2,
  },
  modal: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    my: 2,
    px: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "common.white",
  },
  spacer: {
    width: "40px",
  },
  icon: {
    color: "common.white",
  },
};
