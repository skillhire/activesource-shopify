import React, { useContext } from "react";
import { ShopContext } from "context";
import { IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

const MenuToggleButton = () => {
  const { menuOpen, toggleMenu } = useContext(ShopContext);

  return (
    <IconButton onClick={toggleMenu} color="primary" edge="start" size="large">
      <Menu sx={{ color: "primary.contrastText" }} />
    </IconButton>
  );
};

export default MenuToggleButton;
