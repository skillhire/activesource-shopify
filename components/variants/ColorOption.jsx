import { IconButton, Box } from "@mui/material";

const ColorOption = ({
  color,
  activeColor,
  handleClick,
  size = 24,
  ...props
}) => {
  return (
    <IconButton
      sx={{
        ...sx.button,
        ...(activeColor?.name === color.name && sx.buttonSelected),
      }}
      onClick={() => handleClick(color)}
    >
      <Box
        sx={{
          ...sx.color,
          ...(activeColor?.name === color.name && sx.selected),
          height: `${size}px`,
          width: `${size}px`,
          bgcolor: color.hex,
        }}
        key={color.name}
        value={color.name}
      />
    </IconButton>
  );
};

export default ColorOption;

const sx = {
  button: {
    p: 0,
    minWidth: 0,
    borderRadius: "100%",
    border: "2px solid",
    borderColor: "transparent",
  },
  buttonSelected: {
    border: "2px solid",
    borderColor: "primary.main",
  },
  selected: {
    border: "2px solid",
    borderColor: "common.white",
  },
  color: {
    height: "24px",
    width: "24px",
    borderRadius: "100%",
    border: "1px solid",
    borderColor: "grey.500",
  },
};
