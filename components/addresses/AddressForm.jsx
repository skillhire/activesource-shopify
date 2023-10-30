import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

const AddressForm = ({ address, handleChange }) => {
  return (
    <Box sx={sx.boxContainer}>
      <Box my={1} width="100%">
        <TextField
          size="small"
          fullWidth
          placeholder="Street Address Line 1"
          name="address1"
          variant="outlined"
          value={address?.address1 || ""}
          onChange={handleChange}
        />
      </Box>
      <Box my={1} width="100%">
        <TextField
          size="small"
          fullWidth
          placeholder="Street Address Line 2"
          name="address2"
          variant="outlined"
          value={address?.address2 || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={sx.fields}>
        <TextField
          size="small"
          placeholder="City"
          name="city"
          variant="outlined"
          value={address?.city || ""}
          onChange={handleChange}
        />
        <TextField
          size="small"
          placeholder="State"
          name="province"
          variant="outlined"
          value={address?.province || ""}
          onChange={handleChange}
        />
        <TextField
          size="small"
          placeholder="Country"
          name="country"
          variant="outlined"
          value={address?.country || ""}
          onChange={handleChange}
        />
        <TextField
          size="small"
          placeholder="ZIP Code"
          name="zip"
          variant="outlined"
          value={address?.zip || ""}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

AddressForm.propTypes = {
  loading: PropTypes.bool,
  address: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddressForm;

const sx = {
  root: {},
  input: {
    width: "100%",
  },
  button: {
    py: 2,
    px: 3,
  },
  progress: {
    color: "common.white",
  },
  boxContainer: {
    my: 2,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  fields: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    my: 1,
    width: "100%",
    gap: "10px",
    justifyContent: "space-between",
  },
};
