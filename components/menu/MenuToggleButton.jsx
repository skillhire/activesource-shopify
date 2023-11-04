import React, { useContext } from "react";
import { ShopContext } from "context";
import { IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";

const MenuToggleButton = ({ ...props }) => {
  const { menuOpen, toggleMenu } = useContext(ShopContext);

  return (
    <IconButton
      onClick={toggleMenu}
      color="primary"
      edge="start"
      size="large"
    >
      {menuOpen ? <Close sx={{ color: "primary.contrastText" }} /> : <Menu sx={{ color: "primary.contrastText" }} />}
    </IconButton>
  );
};

export default MenuToggleButton;
