import React from "react";
import { useRouter } from "next/router";
import { AppBar, Box } from "@mui/material";
import { DesktopMenu, MobileMenu } from "components";

const Header = ({ styles = {}, ...props }) => {
  const router = useRouter();

  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <>
      <AppBar sx={sx.appBar} position="fixed" elevation={0}>
        <DesktopMenu handleClick={handleClick} />
      </AppBar>
      <MobileMenu handleClick={handleClick} />
    </>
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
