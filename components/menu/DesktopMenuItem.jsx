import React from "react";
import { Button } from "@mui/material";

const DesktopMenuItem = ({ menuItem, handleClick, icon, ...props }) => {
  return (
    <Button
      sx={sx.button}
      color="primary"
      onClick={() => handleClick(menuItem.value)}
      endIcon={icon && icon}
    >
      {menuItem?.label}
    </Button>
  );
};

export default DesktopMenuItem;

const sx = {
  button: {
    px: 3,
    whiteSpace: "nowrap",
    color: "common.white",
  },
};
