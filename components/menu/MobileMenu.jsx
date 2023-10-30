import React, { useState, useContext } from "react";
import { MobileMenuItem } from "components";
import {
  Fade,
  Box,
  Button,
  IconButton,
  Typography,
  SwipeableDrawer,
  List,
} from "@mui/material";
import { ShopContext } from "context";
import { useRouter } from "next/router";
import { MOBILE_MENU } from "constants/navigation";
import { MENU_TRY_ON_IMG } from "constants/shop";
import { ChevronLeft } from "@mui/icons-material";
import Image from "next/image";

const MobileMenu = (props) => {
  const router = useRouter();
  const [showTryOn, setShowTryOn] = useState(false);
  const { menuOpen, setMenuOpen } = useContext(ShopContext);

  const handleClick = (value) => {
    if (value == "/try-on") {
      setShowTryOn(true);
    } else {
      setShowTryOn(false);
      setMenuOpen(false);
      router.push(value);
    }
  };

  const handleTryOnClick = () => {
    setShowTryOn(false);
    setMenuOpen(false);
    router.push("/try-on");
  };

  return (
    <Fade in={menuOpen}>
      <Box
        sx={{
          ...sx.drawer,
        }}
      >
        {!showTryOn ? (
          <List sx={sx.list}>
            {MOBILE_MENU.map((menuItem, i) => (
              <MobileMenuItem
                key={i}
                menuItem={menuItem}
                handleClick={handleClick}
              />
            ))}
          </List>
        ) : (
          <Box sx={sx.modal}>
            <Box sx={sx.header}>
              <Box sx={sx.spacer}>
                <IconButton onClick={() => setShowTryOn(false)}>
                  <ChevronLeft sx={sx.icon} />
                </IconButton>
              </Box>
              <Typography variant="h5" sx={sx.title}>
                PICK 5 BANDS TO TRY ON AT HOME
              </Typography>
              <Box sx={sx.spacer} />
            </Box>
            <Box sx={sx.image}>
              <Image
                src={MENU_TRY_ON_IMG}
                alt="Home Try-On"
                width={350}
                height={222}
              />
            </Box>
            <Box sx={sx.buttons}>
              <Box sx={sx.buttons}>
                <Button
                  sx={sx.button}
                  variant="outlined"
                  onClick={() => handleClick("/collections/wedding-bands")}
                >
                  Try 5 Bands
                </Button>
                <Button
                  sx={sx.button}
                  onClick={handleTryOnClick}
                  variant="outlined"
                >
                  How It Works
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Fade>
  );
};

export default MobileMenu;

const sx = {
  drawer: {
    zIndex: (theme) => theme.zIndex.drawer,
    width: "100vw",
    position: "fixed",
    top: "50px",
    height: "calc(100vh - 50px)",
    left: 0,
    width: "100vw",
    backgroundColor: "primary.main",
  },
  list: {
    p: 2,
  },
  modal: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    my: 2,
    px: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "common.white",
  },
  spacer: {
    width: "40px",
  },
  buttons: {
    my: 2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    borderColor: "common.white",
    backgroundColor: "transparent",
    color: "common.white",
    "&:hover": {
      borderColor: "common.white",
      color: "common.white",
      backgroundColor: "transparent",
    },
  },
  icon: {
    color: "common.white",
  },
};
