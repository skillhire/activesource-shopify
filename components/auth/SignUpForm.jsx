import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";

const SignUpForm = ({ customer, handleChange, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          name="email"
          value={customer?.email || ""}
          type="email"
          onChange={handleChange}
          label="Email address"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          name="password"
          value={customer?.password || ""}
          type="password"
          onChange={handleChange}
          label="Password"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          name="firstName"
          value={customer?.firstName || ""}
          onChange={handleChange}
          label="First Name"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box width="100%">
        <TextField
          size="small"
          sx={sx.input}
          name="lastName"
          value={customer?.lastName || ""}
          type="email"
          onChange={handleChange}
          label="Last Name"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={customer?.acceptsMarketing || false}
              onChange={handleChange}
              name="acceptsMarketing"
              size="small"
            />
          }
          label={<Typography variant="overline">Tick here if you want to get marketing emails from Active Source Lab</Typography>}
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
