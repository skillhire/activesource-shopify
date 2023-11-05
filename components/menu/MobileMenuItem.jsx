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
}) => {
  return (
    <ListItem
      disablePadding
      sx={{
        ...sx.listItem,
        ...(isSubItem == true && sx.faded),
        ...(isSubmenuOpen == true && sx.faded),
        ...(menuItem?.divider == true && sx.divider),
        ...(menuItem?.divider == false && sx.noDivider),
      }}
      secondaryAction={
        menuItem?.hasSubmenu == true && (
          <IconButton
            size={"small"}
            onClick={() => handleClick(menuItem)}
          >
            {!isSubmenuOpen ? <Add sx={{ color: "primary.main" }} /> : <Remove sx={{ color: "primary.main" }} />}
          </IconButton>
        )
      }
    >
      <ListItemButton onClick={() => handleClick(menuItem)}>
        <ListItemText
          primary={
            <Typography variant={!isSubItem ? 'subtitle1' : 'body2'}>
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
  faded: {
    backgroundColor: "secondary.faded",
  },
  divider: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.8)",
  },
  noDivider: {
    borderBottom: "none",
  },
};
