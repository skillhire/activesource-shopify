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
      { Object.keys(items)?.map((category) => (
        <>
        <ListItem key={category} disablePadding>
          <ListItemText   
            primary={
              <Typography 
                sx={sx.text}
                variant="overline"
              >
                {category}
              </Typography>}
          />
        </ListItem>
        {items[category]?.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ px: 0 }} onClick={() => handleClick(item.value)}>
              <ListItemText
                sx={sx.text}
                primary={
                  <Typography variant="button">
                    {item.label}
                  </Typography>}
              />
            </ListItemButton>
          </ListItem>
        ))}
        </>
      ))}
    </List>
  );
};

export default LayoutMenu;

const sx = {
  root: {},
  text: {
    px: 4,    
  },
};
