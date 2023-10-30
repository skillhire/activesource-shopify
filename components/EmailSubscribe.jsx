import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAlerts, useKlaviyo } from "hooks";

const EmailSubscribe = () => {
  const { showAlertError, showAlertSuccess } = useAlerts();
  const [email, setEmail] = useState("");

  const { loading, subscribe } = useKlaviyo();

  const handleSubscribe = async () => {
    if (!email?.includes("@")) {
      return showAlertError("Please enter a valid email");
    }
    if (email?.length > 0) {
      await subscribe(email);
      setEmail("");
      showAlertSuccess("Success! You are now subscribed.");
    } else {
      showAlertError("Please enter your email");
    }
  };

  return (
    <Box sx={sx.root}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="YOUR EMAIL"
        color="secondary"
        sx={sx.textField}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Button
        sx={sx.button}
        size="small"
        disabled={loading}
        onClick={handleSubscribe}
      >
        SUBSCRIBE
      </Button>
    </Box>
  );
};

export default EmailSubscribe;

const sx = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    borderColor: "common.white",
  },
  textField: {
    border: "none",
    "& .MuiInputBase-root": {
      border: "none",
      color: "common.white",
      fontSize: "14px",
    },
  },
  button: {
    color: "common.white",
    opacity: 0.7,
    minWidth: "60px",
    px: 1,
    borderRadius: "4px",
  },
};
