import React from "react";
import { Box, TextField, InputLabel, Typography } from "@mui/material";

const ContactForm = ({ contactInfo, handleChange, errors }) => {
  return (
    <Box component="form" autoComplete="off">
      <Box>
        <InputLabel htmlFor="name">
          <Typography variant="body2" color="text.primary" mb={1}>
            Your Name
          </Typography>
        </InputLabel>
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
          errors={errors?.name}
          helperText={errors?.name}
        />
      </Box>
      <Box>
        <InputLabel htmlFor="email">
          <Typography variant="body2" color="text.primary" mb={1}>
            Email Address
          </Typography>
        </InputLabel>
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
          errors={errors?.email}
          helperText={errors?.email}
        />
      </Box>
      <Box>
        <InputLabel htmlFor="companyName">
          <Typography variant="body2" color="text.primary" mb={1}>
            Company Name
          </Typography>
        </InputLabel>
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
          errors={errors?.company}
          helperText={errors?.company}
        />
      </Box>
    </Box>
  );
};

export default ContactForm;

const sx = {
  root: {},
  field: {
    mb: 3,
    input: {
      fontSize: 16,
      height: 54,
      py: 0,
      px: 2,
      fontWeight: "normal",
    },
    ".MuiInputBase-root.MuiFilledInput-underline": {
      borderRadius: 1,
      border: "1px solid transparent",
      "&:before, &:after, &:hover:after, &:hover:before": {
        borderBottom: 0,
      },
    },
    "&[errors] .MuiInputBase-root": {
      border: "1px solid red",
    },
    ".MuiFormHelperText-sizeSmall": {
      color: "red"
    }
  },
};
