import React from "react";
import {
  ListItemText,
  ListItemIcon,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import { Check } from "@mui/icons-material";

const MenuList = (props) => {
  const {
    enableIcons = false,
    value,
    reverse,
    options,
    handleClick,
  } = props || {};

  return (
    <Box sx={sx.root}>
      {options?.map((option, index) => (
        <MenuItem
          key={index}
          disableGutters
          selected={option.value === value}
          onClick={() => handleClick(option)}
        >
          <ListItemIcon sx={sx.listItemIcon}>
            {enableIcons &&
              option.value == value &&
              option.reverse == reverse && <Check sx={sx.icon} />}
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="button">{option?.label}</Typography>}
          />
        </MenuItem>
      ))}
    </Box>
  );
};

export default MenuList;

const sx = {
  root: {
    width: "100%",
  },
  icon: {
    color: "primary.main",
    height: "20px",
    width: "20px",
  },
  listItemIcon: {
    justifyContent: "center",
  },
};
