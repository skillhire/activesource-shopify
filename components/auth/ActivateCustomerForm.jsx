import React from "react"
import { Stack, TextField, InputLabel } from "@mui/material";

const ActivateCustomerForm = ({ customer, handleChange, ...props }) => {
  return (    
    <Stack sx={ sx.root } spacing={1} direction="column">
      <InputLabel shrink htmlFor="email" sx={sx.label}>
        Password
      </InputLabel>
      <TextField
        sx={sx.textField}
        type="password"
        size="small"
        fullWidth
        id="password"
        name="password"
        placeholder="New password"
        value={customer?.password || ""}        
        onChange={handleChange}
      />
    </Stack>          
  );
};

export default ActivateCustomerForm;

const sx = {
  root: {    
    width: "100%",    
  },
  label: {
    color: "text.primary",
    fontWeight: 500,
  },
};
