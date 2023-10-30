import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";

const SignUpForm = ({ customer, handleChange, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          variant="outlined"
          name="firstName"
          value={customer?.firstName || ""}
          onChange={handleChange}
          placeholder="First Name"
        />
      </Box>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          variant="outlined"
          name="lastName"
          value={customer?.lastName || ""}
          type="email"
          onChange={handleChange}
          placeholder="Last Name"
        />
      </Box>
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
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={customer?.acceptsMarketing || false}
              onChange={handleChange}
              name="acceptsMarketing"
            />
          }
          label="Subscribe to our newsletter."
        />
      </Box>
    </Box>
  );
};

SignUpForm.propTypes = {
  customer: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SignUpForm;

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
