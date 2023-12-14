import React from "react"
import { Stack, TextField, InputLabel } from "@mui/material";

const ForgotPasswordForm = ({ customer, handleChange, ...props }) => {
  return (    
    <Stack sx={ sx.root } spacing={1} direction="column">
      <InputLabel shrink htmlFor="email" sx={sx.label}>
        Email address
      </InputLabel>
      <TextField
        sx={sx.textField}
        size="small"
        fullWidth
        id="email"
        name="email"
        placeholder="Enter your email"
        value={customer?.email || ""}
        type="email"
        onChange={handleChange}
      />
    </Stack>          
  );
};

export default ForgotPasswordForm;

const sx = {
  root: {    
    width: "100%",    
  },
  label: {
    color: "text.primary",
    fontWeight: 500,
  },
};
