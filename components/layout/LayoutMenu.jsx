import React from "react";
import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

const LayoutMenu = ({ items }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <List sx={sx.root}>
      {items.map((item) => (
        <ListItem key={item.label} disablePadding>
          <ListItemButton onClick={() => handleClick(item.value)}>
            <ListItemText
              sx={sx.text}
              primary={
                <Typography variant="listItem">{item.label}</Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default LayoutMenu;

const sx = {
  root: {},
  text: {
    pr: 4,
  },
};
