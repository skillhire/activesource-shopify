import React, { useState, useEffect } from "react";
import { useAlerts, useAuth } from "hooks";
import { Button, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";


import SignInForm from "./SignInForm";

const SignIn = ({ onSuccess, ...props }) => {
  const router = useRouter();
  const { showAlertError } = useAlerts();
  const { error, loading, signIn } = useAuth();
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
      let resp = await signIn(customer);
      if (resp?.customerAccessToken?.accessToken) {
        onSuccess();
      }
      return resp;
    } else {
      showAlertError("Please enter your email and password to Sign in.");
    }
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  useEffect(() => {
    if (error && Object.keys(error)?.length > 0) {
      showAlertError("Your email or password is incorrect");
    }
  }, [error]);

  return (
    <>
      <SignInForm
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
        Sign In
      </Button>
      <Button
        fullWidth
        size="small"
        color="primary"
        onClick={handleRegisterClick}
      >
        No account? Register
      </Button>
    </>
  );
};

export default SignIn;

const sx = {
  button: {
    my: 2,
  },
  progress: {
    color: "#fff",
  },
};
