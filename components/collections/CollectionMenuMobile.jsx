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
        <ListItem key={accountItem.label} disablePadding>
          <ListItemButton onClick={() => handleClick(accountItem.value)}>
            <ListItemText sx={sx.text} primary={<Typography variant="listItem">{accountItem.label}</Typography>} />
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
  text: {
    whiteSpace: "nowrap",
  },
};
