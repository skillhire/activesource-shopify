import React, { useState, useContext } from "react";
import { Button, CircularProgress } from "@mui/material";
import { CustomizeContext } from "context";
import { useRouter } from "next/router";
import StickyButtonGroup from "./StickyButtonGroup";
import { Edit } from "lucide-react";

const CustomizeButton = (props) => {
  const router = useRouter();
  const { handle } = router.query;

  const {
    loading,
    openMobile,
    setOpenMobile,
    hasCustomization,
    addCustomizationToCart,
  } = useContext(CustomizeContext);

  const [open, setOpen] = useState(false);

  const handleDoneClick = () => {
    if (!hasCustomization) {
      setOpen(true);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    router.push(`/products/${handle}`);
  };

  const handleAddToCart = async () => {
    addCustomizationToCart();
  };

  return (
    <StickyButtonGroup>
      <Button
        onClick={handleAddToCart}
        variant="contained"
        startIcon={loading && <CircularProgress size={20} sx={sx.loading} />}
      >
        Add to Bag
      </Button>
      <Button
        onClick={() => setOpenMobile(!openMobile)}
        variant="outlined"
        startIcon={<Edit size={20} />}
      >
        Customize
      </Button>
    </StickyButtonGroup>
  );
};

export default CustomizeButton;

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
    my: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  loading: {
    color: "common.white",
  },
};
