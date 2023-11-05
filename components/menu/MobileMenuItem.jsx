import React from "react";
import {
  IconButton,
  Typography,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const MobileMenuItem = ({
  menuItem,
  handleClick,
  submenu = false,
  hide = false,
  isSubItem = false,
  isSubMenuOpen = false,
  ...props
}) => {
  if (hide) { return null; }
  return (
    <ListItem
      disablePadding
      sx={{
        ...sx.listItem,
        ...(menuItem?.divider == true && sx.divider),
        ...(menuItem?.divider == false && sx.noDivider),
      }}
      secondaryAction={
        menuItem?.submenu == true && (
          <IconButton
            size={"small"}
            onClick={() => handleClick(menuItem)}
          >
            {!isSubMenuOpen ? <Add sx={sx.icon} /> : <Remove sx={sx.icon} />}
          </IconButton>
        )
      }
    >
      <ListItemButton onClick={() => handleClick(menuItem)}>
        <ListItemText
          primary={
            <Typography variant={!isSubItem ? 'subtitle1' : 'body2'} sx={sx.link}>
              {menuItem.label}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MobileMenuItem;

const sx = {
  listItem: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  divider: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
  },
  noDivider: {
    borderBottom: "none",
  },
  link: {
    color: "common.white",
  },
  submenuListItem: {
    pl: 2,
  },
  icon: {
    color: "common.white",
  },
};
