import React, { useContext } from "react";
import { CustomizeContext } from "context";
import { Box, Button } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import StickyButtonGroup from "./StickyButtonGroup";

const PanelButtons = (props) => {
  const { setOpenMobile, currentPanel, setCurrentPanel } =
    useContext(CustomizeContext);

  const handleBackClick = () => {
    setCurrentPanel("START");
  };

  const handleDoneClick = () => {
    setOpenMobile(false);
    setCurrentPanel("START");
  };

  return (
    <StickyButtonGroup>
      <Box sx={sx.buttons}>
        <Button
          fullWidth
          sx={sx.button}
          startIcon={<ChevronLeft />}
          onClick={handleBackClick}
          variant="outlined"
        >
          Back
        </Button>
        {["CONSTELLATIONS", "GEMSTONES", "SYMBOLS"].includes(currentPanel) && (
          <Button
            fullWidth
            sx={{
              ...sx.doneButton,
            }}
            onClick={handleDoneClick}
            variant="outlined"
          >
            See Design
          </Button>
        )}
      </Box>
    </StickyButtonGroup>
  );
};

export default PanelButtons;

const sx = {
  buttons: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  doneButton: {
    display: {
      xs: "block",
      sm: "none",
    },
  },
};
