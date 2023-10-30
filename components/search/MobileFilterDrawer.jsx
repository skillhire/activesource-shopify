import React from "react";
import { Box, Typography } from "@mui/material";
import { Drawer } from "components";
import CheckboxFilterList from "./CheckboxFilterList";
import PriceRangeInput from "./PriceRangeInput";

const MobileFilterDrawer = (props) => {
  // Price props
  const {
    open,
    handleClose,

    priceRange,
    handlePriceChange,
    minPrice,
    maxPrice,

    materialValues,
    handleMaterialClick,
    materialOptions,
  } = props || {};

  return (
    <Drawer
      open={open}
      handleClose={handleClose}
      styles={sx.mobileDrawer}
      title={"Filters"}
      anchorRight
    >
      <Box sx={sx.heading}>
        <Typography variant="overline" sx={sx.title}>
          Materials
        </Typography>
      </Box>
      <CheckboxFilterList
        values={materialValues}
        options={materialOptions}
        handleClick={(ev, value) => handleMaterialClick(value)}
      />
      <Box sx={sx.heading}>
        <Typography variant="overline" sx={sx.title}>
          Price
        </Typography>
      </Box>
      <PriceRangeInput
        handleChange={handlePriceChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        value={priceRange}
      />
    </Drawer>
  );
};

export default MobileFilterDrawer;

const sx = {
  root: {},
  mobileDrawer: {
    width: {
      xs: "270px",
      sm: "360px",
    },
  },
  title: {
    ml: 2,
    mb: 0,
    p: 0,
  },
  heading: {
    mt: 4,
  },
};
