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
      <Typography variant="subtitle1" sx={sx.label}>
        Color
      </Typography>
      <Box sx={sx.optionsContainer}>
        {colors?.map((color, i) => (
          <ColorOption
            key={i}
            color={color}
            customAttributes={customAttributes}
            handleClick={handleClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CustomColorSelect;

const sx = {
  root: {
    p: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
  },
  label: {
    minWidth: "100px",
    height: "100%",
    justifyContent: "flex-start",
    mb: 1,
  },
  optionsContainer: {
    display: "flex",
    overflowX: "scroll",
    width: "100%",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    gap: "10px",
  },
};
