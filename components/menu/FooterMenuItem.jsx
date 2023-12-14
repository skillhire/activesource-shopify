import {
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";

const FooterMenuItem = ({ menuItem, handleClick }) => {
  return (
    <ListItem disableGutters disablePadding sx={{ ...sx.root }}>
      <ListItemButton
        sx={sx.listItemButton}
        onClick={() => handleClick(menuItem?.value)}
      >
        <ListItemText
          sx={sx.listItemText}
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
  root: {},
  text: {
    color: "common.white",
    whiteSpace: "nowrap",
  },
  listItemText: { m: 0 },
  listItemButton: { px: 0, "&:hover": { background: "none" } },
};
