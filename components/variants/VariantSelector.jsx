import React from "react";
import { Box } from "@mui/material";
import VariantSelect from "./VariantSelect";

const VariantSelector = ({
  selectedOptions,
  handleChange,
  options,
  styles,
  ...props
}) => {
  return (
    <Box sx={sx.root}>
      {options.map((option, i) => {
        if (option?.name == "Color" || option?.name == "Title") return null;
        return (
          <VariantSelect
            key={i}
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
