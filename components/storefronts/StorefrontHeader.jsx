import React from "react";
import { useRouter } from "next/router";
import { AppBar } from "@mui/material";
import StorefrontDesktopMenu from "./StorefrontDesktopMenu";
import { buildStorePath } from "utils";

const Header = ({ storefront, styles = {}, ...props }) => {
  const router = useRouter();  
  const { name, logo, url, imagesUrl } = storefront || {};

  const handleClick = (path) => {
    router.push(path);
  };

  const handleLogoClick = () => {
    let url = buildStorePath(storefront?.handle, '/')
    router.push(url);
  } 

  const shopAllUrl = () => {
    let url = `/collections/${storefront?.collection?.handle}`
    return buildStorePath(storefront?.handle, url)
  }

  return (
    <AppBar color="inherit" sx={sx.appBar} elevation={0}>
      <StorefrontDesktopMenu
        name={name}
        logo={logo}
        imagesUrl={imagesUrl}
        shopAllUrl={shopAllUrl()}
        handleClick={handleClick}
        handleLogoClick={handleLogoClick}
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
