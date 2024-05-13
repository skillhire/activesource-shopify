import React from "react";
import { useRouter } from "next/router";
import { AppBar } from "@mui/material";
import StorefrontDesktopMenu from "./StorefrontDesktopMenu";

const Header = ({ storefront, styles = {}, ...props }) => {
  const router = useRouter();

  const { name, logo } = storefront || {};
  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <AppBar color="inherit" sx={sx.appBar} elevation={0}>
      <StorefrontDesktopMenu
        name={name}
        logo={logo}
        handleClick={handleClick}
      />
    </AppBar>
  );
};

export default Header;

const sx = {
  appBar: {
    bgcolor: "background.shade3",
    height: {
      sm: "64px",
      xs: "50px",
    },
  },
};
