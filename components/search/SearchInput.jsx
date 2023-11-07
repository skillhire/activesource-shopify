import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, InputAdornment, Input } from "@mui/material";

function SearchInput({
  value,
  handleChange,
  handleSearch,
  handleKeyPress,
  handleClear,
  placeholder = "Enter keywords...",
  ...rest
}) {
  return (
    <Box sx={sx.root}>
      <Input
        fullWidth
        variant="standard"
        name="keywords"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        sx={sx.searchInput}
        disableUnderline
        autoComplete="off"
        placeholder={placeholder}
        endAdornment={
          <InputAdornment position="end">
            <Button sx={sx.button} onClick={() => handleSearch(value)}>
              Search
            </Button>
          </InputAdornment>
        }
      />
    </Box>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func,
  handleClear: PropTypes.func,
};

export default SearchInput;

const sx = {
  root: {
    display: "flex",
    alignItems: "center",
    ml: "auto",
    flex: {
      sm: "1 1 auto",
      md: "auto",
    },
    borderBottom: "1px solid",
    borderColor: "primary.main",
  },
  icon: {
    px: 1,
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  button: {
    px: 2,
    minWidth: "60px",
    borderRadius: 1,
  },
  hidden: {
    visibility: "hidden",
  },
};
