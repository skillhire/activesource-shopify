import { Box, Link } from "@mui/material";
import VariantSelect from "./VariantSelect";

const VariantSelector = ({
  selectedOptions,
  handleChange,
  options,
  styles,
  handleInfoClick,
  showGuidelines,
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
      {showGuidelines && (
        <Link variant="overline" color="text.secondary">
          Size Guide
        </Link>
      )}
    </Box>
  );
};

export default VariantSelector;

const sx = {
  root: {},
};
