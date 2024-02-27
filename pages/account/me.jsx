import React, { useEffect, useState, useCallback } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useRouter } from "next/router";

import { LOGIN_URL } from "constants/navigation";
import { AccountLayout, AccountDetails } from "components";
import { useAuth, useAlerts, useCustomers } from "hooks";

const MyAccount = () => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const { showAlertError } = useAlerts();
  const { customer, fetchCustomer, updateCustomer, loading } = useCustomers();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState();

  useEffect(() => {
    if (accessToken) {
      fetchCustomer(accessToken);
    }
    if (customer) {
      setCurrentCustomer(customer);
    }
  }, [accessToken, customer]);

  const handleSubmit = async () => {
    let resp = await updateCustomer({
      customer: currentCustomer,
      customerAccessToken: accessToken,
    });
    if (resp?.customerUpdate?.customerUserErrors?.length > 0) {
      showAlertError(resp?.customerUpdate?.customerUserErrors[0].message);
      return;
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name } = e.target;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCurrentCustomer({
      ...currentCustomer,
      [name]: value,
    });
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  if (!accessToken) {
    return null;
  }

  if (!customer) return null;
  return (
    <AccountLayout
      title={
        <Stack direction="row">
          <Box mr={2}>My Account</Box>
          {!isEditing && (
            <IconButton onClick={handleEdit} color="primary">
              <Edit fontSize="small" />
            </IconButton>
          )}
        </Stack>
      }
    >
      <AccountDetails
        loading={loading}
        customer={currentCustomer}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
      />
    </AccountLayout>
  );
};

export default MyAccount;
