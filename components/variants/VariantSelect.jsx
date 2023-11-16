import { Typography, Box } from "@mui/material";
import OptionButton from "./OptionButton";

const VariantSelect = ({
  name,
  option,
  values,
  selected,
  handleChange,
  handleInfoClick,
  styles = {},
  ...props
}) => {
  return (
    <Box sx={{ ...sx.root, ...styles }}>
      <Typography variant="subtitle1" sx={sx.label}>
        {name}
      </Typography>
      <Box sx={sx.optionsContainer}>
        {values?.map((value) => (
          <OptionButton
            width={"30px"}
            key={value}
            value={value}
            option={option}
            active={selected == value ? true : false}
            handleClick={handleChange}
          >
            {value}
          </OptionButton>
        ))}
      </Box>
    </Box>
  );
};

export default VariantSelect;

const sx = {
  root: {
    borderTop: "1px solid",
    borderColor: "common.border",
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
  active: {
    opacity: 1,
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
