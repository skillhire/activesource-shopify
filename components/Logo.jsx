import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import LOGO from "assets/logo.svg";

const Logo = ({ height = 120, width = 120, white = false, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Button disableRipple onClick={handleClick} sx={sx.root}>
      <Image responsive src={LOGO?.src} alt={"Logo"} height={30} width={240} />
    </Button>
  );
};

export default Logo;

const sx = {
  root: {
    width: "100%",
    maxWidth: "332px",
  },
  image: {
    cursor: "pointer",
    objectFit: "contain",
  },
};
