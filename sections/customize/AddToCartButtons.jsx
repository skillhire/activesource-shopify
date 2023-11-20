import React, { useState, useContext } from "react";
import { Box, Button, CircularProgress, Divider } from "@mui/material";
import { CustomizeContext } from "context";
import { useRouter } from "next/router";
import StickyButtonGroup from "./StickyButtonGroup";
import { ChevronLeft } from "@mui/icons-material";
import { useResponsive } from "hooks";

const AddToCartButtons = (props) => {
  const { isMobile } = useResponsive();
  const { loading, setOpenMobile, setCurrentPanel, addCustomizationToCart } =
    useContext(CustomizeContext);

  const handleBackClick = () => {
    setOpenMobile(false);
    setCurrentPanel("START");
  };

  const handleAddToCart = async () => {
    addCustomizationToCart();
  };

  return (
    <StickyButtonGroup>
      <Box sx={sx.buttons}>
        {isMobile ? (
          <Button
            fullWidth
            sx={sx.button}
            startIcon={<ChevronLeft />}
            onClick={handleBackClick}
            variant="outlined"
          >
            Back
          </Button>
        ) : (
          <Button
            fullWidth
            onClick={handleAddToCart}
            color="secondary"
            variant="contained"
            startIcon={
              loading && <CircularProgress size={20} sx={sx.loading} />
            }
          >
            Add to Cart
          </Button>
        )}
      </Box>
    </StickyButtonGroup>
  );
};

export default AddToCartButtons;

const sx = {
  root: {
    width: {
      xs: "100%",
      sm: "50%",
      md: "480px",
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "common.white",
    position: {
      xs: "fixed",
      sm: "fixed",
    },
    right: 0,
    bottom: 0,
  },
  divider: {
    height: "10px",
    width: "80%",
    borderTop: "1px solid",
    borderColor: "divider",
  },
  container: {
    width: "80%",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  loading: {
    color: "common.white",
  },
};
