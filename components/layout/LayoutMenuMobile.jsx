import React from "react";
import { useRouter } from "next/router";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

const LayoutMenuMobile = ({ items }) => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <List component={Stack} direction="row" sx={sx.root}>
      { Object.keys(items).map((category) => (
        <>
        { items[category].map((item) => (
          <ListItem key={item.label} disablePadding sx={sx.item}>
            <ListItemButton
              onClick={() => handleClick(item.value)}
              sx={sx.button}
            >
              <ListItemText
                primary={<Typography variant="listItem">{item.label}</Typography>}
                sx={sx.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
        </>
      ))}
    </List>
  );
};

export default LayoutMenuMobile;

const sx = {
  root: {
    overflowX: "scroll",
  },
  item: {
    width: "fit-content",
  },
  text: {
    whiteSpace: "nowrap",
  },
  button: {
    mr: 2,
    padding: 0,
    "&:hover": {
      background: "none",
    },
  },
};
