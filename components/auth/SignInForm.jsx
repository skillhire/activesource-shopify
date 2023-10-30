import React from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

const SignInForm = ({ customer, handleChange, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          variant="outlined"
          name="email"
          value={customer?.email || ""}
          type="email"
          onChange={handleChange}
          placeholder="Your Email"
        />
      </Box>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          variant="outlined"
          name="password"
          value={customer?.password || ""}
          type="password"
          onChange={handleChange}
          placeholder="Your Password"
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
  },
  input: {
    width: "100%",
  },
};
