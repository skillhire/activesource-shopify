import React, { useEffect, useState, useCallback } from "react";
import { Box, Stack, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

import { AccountLayout, AccountDetails } from "components";
import { useAuth, useCustomers } from "hooks";

const MyAccount = () => {
  const { accessToken } = useAuth();
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

  const handleSubmit = useCallback(async () => {
    await updateCustomer({
      customer: currentCustomer,
      customerAccessToken: accessToken,
    });
    setIsEditing(false);
  }, [currentCustomer, accessToken]);

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
