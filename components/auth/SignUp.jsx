import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAlerts, useAuth } from "hooks";
import { Button, CircularProgress, Typography } from "@mui/material";

import SignUpForm from "./SignUpForm";

const SignUp = ({ onSuccess }) => {
  const { showAlertError } = useAlerts();
  const { loading, error, register } = useAuth();
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
    if (customer?.email && customer?.password) {
      let resp = await register(customer);
      if (resp?.customerCreate?.customerUserErrors?.length > 0) {
        showAlertError(resp?.customerCreate?.customerUserErrors[0]?.message);
      }
      if (resp?.customerAccessToken?.accessToken) {
        onSuccess();
      }
    } else {
      showAlertError("Please enter your email and password to Sign Up.");
    }
  };

  useEffect(() => {
    if (error && Object.keys(error)?.length > 0) {
      showAlertError(
        "There was a problem signing up, the email may have already been taken"
      );
    }
  }, [error]);

  return (
    <>
      <SignUpForm
        customer={customer}
        handleChange={handleChange}
        loading={loading}
      />
      <Button
        sx={sx.button}
        fullWidth
        color="secondary"
        endIcon={loading && <CircularProgress size={20} sx={sx.progress} />}
        variant="contained"
        onClick={handleSubmit}
      >
        Create Account
      </Button>
      <Typography variant="caption" component="p">
        Want to know more about how and why Active Source Lab uses your personal
        information? Read our Privacy Notice.
      </Typography>
    </>
  );
};

SignUp.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default SignUp;

const sx = {
  button: {
    my: 2,
  },
  progress: {
    color: "#fff",
  },
};
