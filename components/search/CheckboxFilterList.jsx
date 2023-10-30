import React from "react";
import {
  Box,
  MenuItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const FilterOptionList = (props) => {
  const { values, options, handleClick } = props || {};

  return (
    <Box>
      {options?.map((option, index) => (
        <MenuItem key={index} onClick={(ev) => handleClick(ev, option.value)}>
          <ListItemIcon>
            {values.includes(option.value) ? (
              <Box sx={sx.checkboxFilled} />
            ) : (
              <Box sx={sx.checkboxOutlined} />
            )}
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="button">{option?.label}</Typography>}
          />
        </MenuItem>
      ))}
    </Box>
  );
};

export default FilterOptionList;

const sx = {
  checkboxFilled: {
    height: 18,
    width: 18,
    borderRadius: "2px",
    mx: "4px",
    backgroundColor: "primary.main",
  },
  checkboxOutlined: {
    height: 18,
    width: 18,
    borderRadius: "2px",
    border: "2px solid",
    mx: "4px",
    borderColor: "primary.main",
  },
};
