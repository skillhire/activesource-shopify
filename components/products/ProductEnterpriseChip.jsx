import React from "react";
import { Chip } from "@mui/material";

const ProductEnterpriseChip = ({size}) => {
  const chipStyles = size === "small" ? sx.smallChip : sx.chip;
  return (
    <Chip sx={chipStyles} label="Enterprise" variant="filled" color="tertiary" />
  );
};

export default ProductEnterpriseChip;

const sx = {
  chip: {
    textTransform: "uppercase",
    height: 26,
    fontSize: 14,
    "span": {
      px: 2,
    }
  },
  smallChip: {
    textTransform: "uppercase",
    height: 21,
    fontSize: 10,
    "span": {
      px: 1,
    }
  },
};
