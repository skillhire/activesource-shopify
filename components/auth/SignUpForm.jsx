import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, FormControlLabel, InputLabel, TextField, Typography, Stack } from "@mui/material";

const SignUpForm = ({ customer, handleChange, ...props }) => {
  return (
    <Box sx={sx.root}>
      <Box width="100%">
        <InputLabel shrink htmlFor="email" sx={sx.label}>
          Email address
        </InputLabel>
        <TextField
          size="small"
          sx={sx.input}
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
          sx={sx.input}
          id="password"
          name="password"
          value={customer?.password || ""}
          type="password"
          onChange={handleChange}
        />
      </Box>
      <Box width="100%">
        <InputLabel shrink htmlFor="firstName" sx={sx.label}>
          First Name
        </InputLabel>
        <TextField
          size="small"
          sx={sx.input}
          id="firstName"
          name="firstName"
          value={customer?.firstName || ""}
          onChange={handleChange}
        />
      </Box>
      <Stack width="100%">
        <InputLabel shrink htmlFor="lastName" sx={sx.label}>
          Last Name
        </InputLabel>
        <TextField
          size="small"
          sx={sx.input}
          name="lastName"
          value={customer?.lastName || ""}
          type="email"
          onChange={handleChange}
        />
        <Box my={1}>
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
      </Stack>
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
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 2,
      },
    },
  },
  label: {
    color: "text.primary",
    fontWeight: 500,
  },
  input: {
    width: "100%",
  },
};
