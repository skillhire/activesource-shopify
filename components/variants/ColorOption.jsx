import { IconButton, Box } from "@mui/material";

const ColorOption = ({
  color,
  activeColor,
  handleClick,
  size = 24,
  ...props
}) => {
  return (
    <IconButton sx={sx.button} onClick={() => handleClick(color)}>
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
  },
  selected: {
    border: "2px solid",
    borderColor: "primary.main",
  },
  color: {
    height: "24px",
    width: "24px",
    borderRadius: "100%",
  },
};
