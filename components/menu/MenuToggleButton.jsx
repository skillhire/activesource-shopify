import React, { useContext } from "react";
import { ShopContext } from "context";
import { Hidden, IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

const MenuToggleButton = ({ ...props }) => {
  const { menuOpen, toggleMenu } = useContext(ShopContext);

  return (
    <Hidden mdUp>
      <IconButton
        onClick={toggleMenu}
        color="primary"
        edge="start"
        size="large"
      >
        {menuOpen ? <Close /> : <Menu />}
      </IconButton>
    </Hidden>
  );
};

export default MenuToggleButton;
