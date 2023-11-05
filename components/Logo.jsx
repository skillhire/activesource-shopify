import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";

import LOGO from "assets/logo.svg";

const Logo = ({ height = 120, width = 120, white = false, ...props }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Box sx={sx.root}>
      <Button disableRipple onClick={handleClick} sx={sx.button}>
        <Image responsive src={LOGO?.src} alt={"Logo"} height={30} width={240} />
      </Button>
    </Box>
  );
};

export default Logo;

const sx = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    padding: 0,
  },
  image: {
    cursor: "pointer",
    objectFit: "contain",
  },
};
