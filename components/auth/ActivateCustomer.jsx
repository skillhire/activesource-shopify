import React, { useState, useEffect } from "react";
import { useAlerts, useAuth } from "hooks";
import {
  Stack,
  Link,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/router";
import ActivateCustomerForm from "./ActivateCustomerForm";
import { CLIENT_PROD_URL } from "constants/shop";

const ActivateCustomer = ({ onSuccess }) => {
  const router = useRouter();
  const { showAlertSuccess, showAlertError } = useAlerts();
  const { error, loading, activateByUrl } = useAuth();
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
    const activationUrl =  CLIENT_PROD_URL + router.asPath;    
    if (customer?.password && activationUrl) {
      let resp = await activateByUrl(customer?.password, activationUrl);
      if (resp?.customerActivateByUrl?.customerAccessToken) {
        showAlertSuccess("Your account has been successfully activated.");
        onSuccess();
      } else {
        showAlertError("There was an error activating your account");
      }
      return resp;
    } else {
      showAlertError("Please enter your password to activate your account.");
    }
  };

  useEffect(() => {
    if (error && Object.keys(error)?.length > 0) {
      showAlertError("Your email or password is incorrect");
    }
  }, [error]);

  return (
    <Stack alignItems="center">
      <ActivateCustomerForm
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
        Activate Account
      </Button>
      <Link href="/login" variant="link" size="small">
        <Typography variant="overline">Sign In</Typography>
      </Link>
    </Stack>
  );
};

export default ActivateCustomer;

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
