import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, InputLabel, Typography } from "@mui/material";

const SignInForm = ({ customer, handleChange, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box width="100%">
        <InputLabel shrink htmlFor="email" sx={sx.label}>
          Email address
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          id="email"
          name="email"
          value={customer?.email || ""}
          type="email"
          onChange={handleChange}
        />
      </Box>
      <Box width="100%">
        <InputLabel shrink htmlFor="password" sx={sx.label}>
          Password
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          id="password"
          name="password"
          value={customer?.password || ""}
          type="password"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

SignInForm.propTypes = {
  customer: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SignInForm;

const sx = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: 2,
      },
    },
  },
  label: {
    color: "text.primary",
    fontWeight: 500,
  },
};
