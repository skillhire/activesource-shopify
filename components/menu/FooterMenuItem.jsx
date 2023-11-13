import {
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

const FooterMenuItem = ({ menuItem, handleClick, submenu = false }) => {
  return (
    <ListItem
      disableGutters
      disablePadding
      sx={{ ...sx.listItem, ...(submenu && sx.submenuListItem) }}
    >
      <ListItemButton
        sx={sx.listItemButton}
        onClick={() => handleClick(menuItem?.value)}
      >
        <ListItemText
          primary={
            <Typography sx={sx.text} variant="footer">
              {menuItem?.label}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};

export default FooterMenuItem;

const sx = {
  listItem: {},
  text: {
    color: "common.white",
  },
  listItemButton: {
    px: 0,
  },
};
