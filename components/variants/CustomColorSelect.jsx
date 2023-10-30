import { Box, Typography } from "@mui/material";
import ColorOption from "./ColorOption";

const CustomColorSelect = ({
  colors,
  customAttributes,
  handleClick,
  ...props
}) => {
  return (
    <Box sx={sx.root}>
      <Typography variant="button" sx={sx.label}>
        Color
      </Typography>
      {colors?.map((color, i) => (
        <ColorOption
          key={i}
          color={color}
          customAttributes={customAttributes}
          handleClick={handleClick}
        />
      ))}
    </Box>
  );
};

export default CustomColorSelect;

const sx = {
  root: {
    p: 0,
    borderTop: "1px solid",
    borderColor: "common.border",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  label: {
    minWidth: "100px",
    height: "100%",
    justifyContent: "flex-start",
  },
};
