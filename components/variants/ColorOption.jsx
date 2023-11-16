import { Button, Box } from "@mui/material";
import { getValue } from "utils";

const ColorOption = ({
  color,
  customAttributes,
  handleClick,
  size = 24,
  ...props
}) => {
  const hex = getValue(color, "color");
  const label = getValue(color, "label");
  const selected = customAttributes?.color;

  return (
    <Button
      sx={{
        ...sx.button,
        height: `${size + 4}px`,
        width: `${size + 4}px`,
        ...(selected === label && sx.selected),
      }}
      onClick={() => handleClick(color)}
    >
      <Box
        sx={{
          ...sx.color,
          height: `${size}px`,
          width: `${size}px`,
          bgcolor: hex,
        }}
        key={label}
        value={label}
      />
    </Button>
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
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "divider",
    borderRadius: "100%",
  },
};
