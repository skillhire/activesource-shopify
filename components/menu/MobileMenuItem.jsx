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
  isSubItem = false,
  isSubmenuOpen = false,
  ...props
}) => {
  return (
    <ListItem
      disablePadding
      sx={{
        ...sx.listItem,
        ...(menuItem?.divider == true && sx.divider),
        ...(menuItem?.divider == false && sx.noDivider),
      }}
      secondaryAction={
        menuItem?.hasSubmenu == true && (
          <IconButton
            size={"small"}
            onClick={() => handleClick(menuItem)}
          >
            {!isSubmenuOpen ? <Add sx={sx.icon} /> : <Remove sx={sx.icon} />}
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
