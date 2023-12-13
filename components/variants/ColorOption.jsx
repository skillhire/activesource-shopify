import { Button, Box } from "@mui/material";
import { getValue, getImage } from "utils";

const ColorOption = ({
  color,
  activeColor,
  handleClick,
  size = 24,
  ...props
}) => {
  return (
    <Button
      sx={{
        ...sx.button,
        height: `${size + 4}px`,
        width: `${size + 4}px`,
        ...(activeColor?.name === color.name && sx.selected),
      }}
      onClick={() => handleClick(color)}
    >
      <Box
        sx={{
          ...sx.color,
          height: `${size}px`,
          width: `${size}px`,
          bgcolor: color.hex,
        }}
        key={color.name}
        value={color.name}
      />
    </Button>
  );
};

export default ColorOption;

const sx = {
  button: {
    p: 0,
    mr: 0.5,
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
