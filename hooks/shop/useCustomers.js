import React, { useState, useEffect } from "react";
import { useAuth } from "hooks";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  QUERY_CUSTOMER,
  MUTATION_CUSTOMER_CREATE,
  MUTATION_CUSTOMER_UPDATE,
} from "graphql/shopify/customers";

const useCustomers = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { accessTokenRenew } = useAuth();

  const [customer, setCustomer] = useState();

  const [fetchCustomerQuery, fetchCustomerResp] = useLazyQuery(QUERY_CUSTOMER);

  const [createCustomerMutation, createCustomerResp] = useMutation(
    MUTATION_CUSTOMER_CREATE
  );

  const [updateCustomerMutation, updateCustomerResp] = useMutation(
    MUTATION_CUSTOMER_UPDATE
  );

  const fetchCustomer = async (customerAccessToken) => {
    let resp = await fetchCustomerQuery({
      variables: {
        customerAccessToken,
      },
    });
    setCustomer(resp?.data?.customer);
    return resp?.data;
  };

  const createCustomer = async ({
    firstName,
    lastName,
    email,
    password,
    acceptsMarketing = false,
  }) => {
    let resp = await createCustomerMutation({
      variables: {
        input: {
          firstName,
          lastName,
          email,
          password,
          acceptsMarketing,
        },
      },
    });
    setCustomer(resp?.data?.customerCreate?.customer);
    return resp?.data?.customerCreate;
  };

  const updateCustomer = async ({ customerAccessToken, customer }) => {

    let phone = customer.phone;
    if(phone.startsWith("1")){
      phone = `+${phone}`;
    }else if(!phone.startsWith("+1")){
      phone = `+1${phone}`;
    }
    
    const variables = {
      customerAccessToken,
      customer: {
        email: customer.email,
        phone: phone,
        firstName: customer.firstName,
        lastName: customer.lastName,
        acceptsMarketing: customer.acceptsMarketing,
      },
    };

    if (customer.password) {
      variables.customer.password = customer.password;
    }

    let resp = await updateCustomerMutation({ variables });
    if (resp?.data?.customerUpdate?.customer) {
      setCustomer(resp?.data?.customerUpdate?.customer);
    }
    return resp?.data;
  };

  useEffect(() => {
    setError(
      fetchCustomerResp?.error ||
        createCustomerResp?.error ||
        updateCustomerResp?.error
    );
  }, [
    fetchCustomerResp?.error,
    createCustomerResp?.error,
    updateCustomerResp?.error,
  ]);

  useEffect(() => {
    setLoading(
      fetchCustomerResp?.loading ||
        createCustomerResp?.loading ||
        updateCustomerResp?.loading
    );
  }, [
    fetchCustomerResp?.loading,
    createCustomerResp?.loading,
    updateCustomerResp?.loading,
  ]);

  return {
    loading,
    error,
    customer,
    fetchCustomer,
    createCustomer,
    updateCustomer,
  };
};

export default useCustomers;
