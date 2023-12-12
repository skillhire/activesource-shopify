import React, { useEffect, useState, useCallback } from "react";

import { AccountLayout, AccountDetails } from "components";
import { useAuth, useCustomers } from "hooks";

const MyAccount = () => {
  const { accessToken } = useAuth();
  const { customer, fetchCustomer, updateCustomer, loading } = useCustomers();
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState()

  useEffect(() => {
    if (accessToken) {
      fetchCustomer(accessToken);
    }
    if (customer) {
      setCurrentCustomer(customer);
    }
  }, [accessToken, customer]);

  const handleSubmit = useCallback(async () => {
    updateCustomer({
      customer: currentCustomer,
      customerAccessToken: accessToken,
    });
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
    setIsEditing(false)
  }, [setIsEditing])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [setIsEditing])


  return (
    <AccountLayout title="My Account">
      <AccountDetails
        loading={loading}
        customer={currentCustomer}
        isEditing={isEditing}
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleCancel={handleCancel}
      />
    </AccountLayout>
  );
};

export default MyAccount;
