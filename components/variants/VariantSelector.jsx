import { Box } from "@mui/material";
import VariantSelect from "./VariantSelect";

const VariantSelector = ({
  selectedOptions,
  handleChange,
  options,
  styles,
  handleInfoClick,
  ...props
}) => {
  return (
    <Box sx={sx.root}>
      {options.map((option) => {
        if (option?.name == "Title") return null;
        return (
          <VariantSelect
            name={option?.name}
            option={option?.name}
            values={option?.values}
            selected={selectedOptions[option?.name]}
            handleChange={handleChange}
            handleInfoClick={() => handleInfoClick(option?.name)}
          />
        );
      })}
    </Box>
  );
};

export default VariantSelector;

const sx = {
  root: {},
};
