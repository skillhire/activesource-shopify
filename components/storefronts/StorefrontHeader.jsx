import React from "react";
import { useRouter } from "next/router";
import { AppBar } from "@mui/material";
import StorefrontDesktopMenu from "./StorefrontDesktopMenu";

const Header = ({ name, styles = {}, ...props }) => {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <AppBar sx={sx.appBar} position="fixed" elevation={0}>
      <StorefrontDesktopMenu 
        name={name}
        handleClick={handleClick} />
    </AppBar>
  );
};

export default Header;

const sx = {
  appBar: {
    height: {
      sm: "64px",
      xs: "50px",
    },
  },
};
