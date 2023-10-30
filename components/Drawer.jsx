import React from "react";
import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const Drawer = ({
  open,
  title,
  anchor = "left",
  subtitle,
  handleClose,
  children,
  width = 440,
  actions,
  anchorLeft = false,
  anchorRight = false,
  icon: Icon = ChevronLeft,
  styles = {},
  ...props
}) => {
  return (
    <SwipeableDrawer
      open={open}
      variant="temporary"
      anchor={anchor}
      onOpen={handleClose}
      onClose={handleClose}
      PaperProps={{
        sx: {
          ...sx.paper,
          ...styles,
        },
      }}
    >
      <Box sx={{ ...sx.root, ...styles }}>
        <Box sx={sx.header}>
          {anchorLeft && (
            <Box sx={sx.iconButton}>
              <IconButton onClick={handleClose}>
                <Icon />
              </IconButton>
            </Box>
          )}
          <Box sx={sx.title}>
            {title && <Typography variant="h6">{title}</Typography>}
          </Box>
          {anchorRight && (
            <Box sx={sx.iconButton}>
              <IconButton onClick={handleClose}>
                <Icon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            ...sx.container,
          }}
        >
          {children}
          {actions && <Box>{actions}</Box>}
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;

const sx = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: {
      xs: "100vw",
      md: "360px",
    },
    overflowX: "hidden",
  },
  paper: {
    width: "100%",
  },
  title: {
    width: "100px",
    px: 2,
  },
  iconButton: {
    width: "40px",
    height: "100%",
  },
  header: {
    mt: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    width: {
      sm: "440px",
      xs: "100vw",
    },
  },
};
