import PropTypes from "prop-types";
import { Box, Button, ButtonGroup } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantitySelector = ({
  quantity,
  handleChange,
  small = false,
  styles,
  ...props
}) => {
  const addQuantity = () => handleChange(quantity + 1);
  const removeQuantity = () => handleChange(quantity - 1);

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <ButtonGroup sx={sx.buttonGroup}>
        <Button sx={sx.button} onClick={removeQuantity}>
          <Remove sx={sx.icon} />
        </Button>
        <Button
          sx={sx.button}
          onClick={() => {
            return null;
          }}
        >
          {quantity}
        </Button>
        <Button sx={sx.button} onClick={addQuantity}>
          <Add sx={sx.icon} />
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default QuantitySelector;

const sx = {
  root: {
    mr: 1,
  },
  icon: {
    fontSize: 16,
  },
  buttonGroup: {
    borderRadius: "50px",
    border: "1px solid",
    borderColor: "primary.light",
  },
  button: {
    border: "none",
    "&:hover": {
      border: "none",
    },
  },
};
