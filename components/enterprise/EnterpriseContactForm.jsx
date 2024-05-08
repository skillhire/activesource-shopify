import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, InputLabel } from "@mui/material";

const EnterpriseContactForm = ({ contactInfo, handleChange }) => {
  return (
    <Box sx={sx.boxContainer}>
      <Box>
        <InputLabel sx={sx.fieldLabel} for="name">Your Name</InputLabel>
        <TextField
          sx={sx.field}
          fullWidth
          required
          size="small"
          placeholder="Enter Your Name"
          name="name"
          id="name"
          variant="filled"
          value={contactInfo?.name || ""}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <InputLabel sx={sx.fieldLabel} for="email">Email Address</InputLabel>
        <TextField
          sx={sx.field}
          fullWidth
          required
          size="small"
          placeholder="Enter Your Email"
          name="email"
          type="email"
          id="email"
          variant="filled"
          value={contactInfo?.email || ""}
          onChange={handleChange}
        />
      </Box>
      <Box>
        <InputLabel sx={sx.fieldLabel} for="companyName">Company Name</InputLabel>
        <TextField
          sx={sx.field}
          fullWidth
          required
          size="small"
          placeholder="Enter Company Name"
          name="companyName"
          id="companyName"
          variant="filled"
          value={contactInfo?.companyName || ""}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

EnterpriseContactForm.propTypes = {
  loading: PropTypes.bool,
  contactInfo: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EnterpriseContactForm;

const sx = {
  root: {},
  boxContainer: {
    my: 2,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "487px",
  },
  fieldLabel: {
    color: "text.primary",
    fontSize: 16,
    mb: 1,
  },
  field: {
    mb: 3,
    "input": {
      fontSize: 16,
      height: 56,
      py: 0,
      px: 2,
      fontWeight: "normal",
    },
    ".MuiInputBase-root.MuiFilledInput-underline": {
      borderRadius: "5px",
      "&:before, &:after, &:hover:after, &:hover:before": {
        borderBottom: 0,
      },
    },
  },
};
