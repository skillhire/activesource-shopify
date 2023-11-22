import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAlerts, useAuth } from "hooks";
import { Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import RegisterForm from "./SignUpForm";

const SignUp = ({ onSuccess, ...props }) => {
  const router = useRouter();
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
      if (resp?.customerAccessToken?.accessToken) {
        onSuccess();
      }
    } else {
      showAlertError("Please enter your email and password to Sign Up.");
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
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
      <RegisterForm
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
      <Button
        fullWidth
        size="small"
        color="primary"
        onClick={handleLoginClick}
      >
        Already Registered? Sign In
      </Button>
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
