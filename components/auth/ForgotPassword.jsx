import React, { useState, useEffect } from "react";
import { useAlerts, useAuth } from "hooks";
import {
  Stack,
  Link,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import ForgotPasswordForm from "./ForgotPasswordForm";

const ForgotPassword = ({ onSuccess }) => {
  const { showAlertSuccess, showAlertError } = useAlerts();
  const { error, loading, recover } = useAuth();
  const [customer, setCustomer] = useState({});

  const handleChange = (e) => {
    const { name } = e.target;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (customer?.email) {
      let resp = await recover(customer?.email);
      showAlertSuccess("Password reset instructions have been sent.");
      return resp;
    } else {
      showAlertError("Please enter your email to reset password.");
    }
  };

  useEffect(() => {
    if (error && Object.keys(error)?.length > 0) {
      showAlertError("Your email or password is incorrect");
    }
  }, [error]);

  return (
    <Stack alignItems="center">
      <ForgotPasswordForm
        loading={loading}
        customer={customer}
        handleChange={handleChange}
      />
      <Button
        sx={sx.button}
        fullWidth
        color="secondary"
        endIcon={loading && <CircularProgress size={20} sx={sx.progress} />}
        variant="contained"
        onClick={handleSubmit}
      >
        Send Reset Password Instructions
      </Button>
      <Link href="/login" variant="link" size="small">
        <Typography variant="overline">Sign In</Typography>
      </Link>
    </Stack>
  );
};

export default ForgotPassword;

const sx = {
  button: {
    my: 2,
    mt: 4,
    color: 'common.white'  
  },
  progress: {
    color: "#fff",
  },
};
