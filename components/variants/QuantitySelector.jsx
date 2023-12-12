import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const QuantitySelector = ({
  quantity,
  handleChange,
  small = false,
  styles,
  ...props
}) => {
  const addQuantity = () => {
    handleChange(quantity + 1);
  };
  const removeQuantity = () => {
    if (quantity > 1) {
      handleChange(quantity - 1);
    }
  };

  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <ButtonGroup sx={sx.buttonGroup}>
        <Button sx={sx.button} size="small" onClick={removeQuantity}>
          <Remove sx={sx.icon} />
        </Button>
        <Button sx={sx.button} size="small">
          <Typography variant="body2">{quantity}</Typography>
        </Button>
        <Button sx={sx.button} size="small" onClick={addQuantity}>
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
    fontSize: 20,
    opacity: 0.5,
  },
  buttonGroup: {
    border: "1px solid",
    borderColor: "primary.light",
    borderRadius: 10,
  },
  button: {
    border: "none",
    "&:hover": {
      border: "none",
    },
  },
};
