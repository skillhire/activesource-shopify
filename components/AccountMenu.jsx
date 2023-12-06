import React from "react";
import { useRouter } from "next/router";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

import { ACCOUNT_MENU } from "constants/navigation";

const AccountMenu = () => {
  const router = useRouter();

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <List>
      {ACCOUNT_MENU.map((accountItem) => (
        <ListItem key={accountItem.label} disablePadding>
          <ListItemButton onClick={() => handleClick(accountItem.value)}>
            <ListItemText primary={accountItem.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AccountMenu;

const sx = {
  root: {},
};
