import React from "react";
import { Box, Stack, TextField, InputLabel } from "@mui/material";

const EnterpriseContactForm = ({ contactInfo, handleChange }) => {
  return (
    <Stack>
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
    </Stack>
  );
};

export default EnterpriseContactForm;

const sx = {
  root: {},
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
      borderRadius: 1,
      "&:before, &:after, &:hover:after, &:hover:before": {
        borderBottom: 0,
      },
    },
  },
};
