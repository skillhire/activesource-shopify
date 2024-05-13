import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantitySelector = ({
  quantity,
  handleChange,
  small = false,
  styles,
  ...props
}) => {
  let [text, setText] = useState(quantity);

  const addQuantity = () => {
    handleChange(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity > 0) {
      handleChange(quantity - 1);
    }
  };

  const handleQtyChange = (ev) => {
    let qty = parseInt(ev.target.value);
    setText(ev.target.value);
    if (!isNaN(qty) && qty >= 0) {
      handleChange(qty);
    }
  };

  useEffect(() => {
    setText(quantity);
  }, [quantity]);

  return (
    <ButtonGroup
      sx={{
        ...sx.buttonGroup,
        ...(small && sx.buttonGroupSmall),
      }}
    >
      <Button
        sx={{
          ...sx.button,
          ...(small && sx.buttonSmall),
        }}
        size="small"
        onClick={removeQuantity}
      >
        <Remove sx={sx.icon} />
      </Button>
      <Button
        sx={{
          ...sx.button,
          ...(small && sx.buttonSmall),
        }}
        size="small"
      >
        <TextField
          value={text}
          variant="standard"
          onChange={handleQtyChange}
          InputProps={{
            disableUnderline: true,
            inputProps: {
              style: {
                fontSize: 16,
                textAlign: "center",
                fontWeight: 500,
              },
            },
          }}
        />
      </Button>
      <Button
        sx={{
          ...sx.button,
          ...(small && sx.buttonSmall),
        }}
        size="small"
        onClick={addQuantity}
      >
        <Add sx={sx.icon} />
      </Button>
    </ButtonGroup>
  );
};

export default QuantitySelector;

const sx = {
  icon: {
    fontSize: 20,
    opacity: 0.5,
  },
  buttonGroup: {
    maxWidth: "150px",
    border: "1px solid",
    borderColor: "primary.light",
    borderRadius: 10,
  },
  buttonGroupSmall: {
    height: "32px",
  },
  button: {
    p: 0,
    width: "30px",
    minWidth: "30px",
    border: "none",
    "&:hover": {
      border: "none",
    },
  },
  buttonSmall: {
    height: "32px",
    minHeight: "32px",
  },
};
