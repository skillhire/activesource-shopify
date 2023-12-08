import React from "react";
import { useRouter } from "next/router";
import { Stack, List, ListItem, ListItemText, ListItemButton, Typography } from "@mui/material";

import { COLLECTIONS_MENU } from "constants/navigation";

const CollectionMenuMobile = () => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <List component={Stack} direction="row" sx={sx.root}>
      {COLLECTIONS_MENU.map((accountItem) => (
        <ListItem key={accountItem.label} disablePadding sx={sx.item}>
          <ListItemButton onClick={() => handleClick(accountItem.value)} sx={sx.button}>
            <ListItemText primary={<Typography variant="listItem">{accountItem.label}</Typography>} sx={sx.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default CollectionMenuMobile;

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
    }
  }
};
