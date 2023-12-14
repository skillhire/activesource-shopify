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
        <Typography variant="body2">{quantity}</Typography>
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
