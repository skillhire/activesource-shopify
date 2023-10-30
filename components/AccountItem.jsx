import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { ChevronRight } from "lucide-react";

const AccountItem = ({ title, subtitle, icon, handleClick, ...props }) => {
  return (
    <ListItem
      disableGutters
      sx={sx.root}
      secondaryAction={
        <IconButton onClick={handleClick}>
          <ChevronRight size={20} />
        </IconButton>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={<Typography variant="subtitle1">{title}</Typography>}
          secondary={
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default AccountItem;

const sx = {
  root: {},
};
