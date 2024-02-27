import React from "react";
import { Button } from "@mui/material";

const CustomizeButton = ({ disabled = false, handleClick }) => {
  return (
    <Button
      disabled={disabled}
      fullWidth
      variant="outlined"
      onClick={handleClick}
    >
      Customize
    </Button>
  );
};

export default CustomizeButton;
