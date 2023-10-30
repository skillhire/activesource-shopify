import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  QUERY_CUSTOMER_ADDRESSES,
  MUTATION_CUSTOMER_ADDRESS_CREATE,
  MUTATION_CUSTOMER_ADDRESS_UPDATE,
  MUTATION_CUSTOMER_ADDRESS_DELETE,
} from "graphql/shopify/customers";
import { getBase64DecodedId } from "utils";

const useAddresses = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState();

  const [fetchCustomerAddressesQuery, fetchCustomerAddressesResp] =
    useLazyQuery(QUERY_CUSTOMER_ADDRESSES);

  const [createCustomerAddressMutation, createCustomerAddressResp] =
    useMutation(MUTATION_CUSTOMER_ADDRESS_CREATE);

  const [updateCustomerAddressMutation, updateCustomerAddressResp] =
    useMutation(MUTATION_CUSTOMER_ADDRESS_UPDATE);

  const [deleteCustomerAddressMutation, deleteCustomerAddressResp] =
    useMutation(MUTATION_CUSTOMER_ADDRESS_DELETE);

  const fetchCustomerAddress = async (accessToken, addressId) => {
    let data = await fetchCustomerAddresses(accessToken, 250);
    let customerAddresses = data.customer.addresses.edges.map((e) => e.node);
    let customerAddress = customerAddresses.find(
      (a) => getBase64DecodedId(a.id) === addressId
    );
    setAddress(customerAddress);
    return customerAddress;
  };

  const fetchCustomerAddresses = async (
    customerAccessToken,
    first = 20,
    cursor = null,
    query = null
  ) => {
    let resp = await fetchCustomerAddressesQuery({
      variables: {
        customerAccessToken,
        first,
        cursor,
        query,
      },
    });
    return resp?.data;
  };

  const updateCustomerAddress = async ({
    customerAccessToken,
    id,
    address,
  }) => {
    let resp = await updateCustomerAddressMutation({
      variables: {
        customerAccessToken,
        id,
        address,
      },
    });

    if (resp?.data?.customerAddressUpdate?.customerAddress) {
      setAddress(resp?.data?.customerAddressUpdate?.customerAddress);
    }

    return resp?.data?.customerAddressUpdate;
  };

  const createCustomerAddress = async ({ customerAccessToken, address }) => {
    let resp = await createCustomerAddressMutation({
      variables: {
        customerAccessToken,
        address,
      },
    });

    if (resp?.data?.customerAddressCreate?.customerAddress) {
      setAddress(resp?.data?.customerAddressCreate?.customerAddress);
    }

    return resp?.data?.customerAddressCreate;
  };

  const deleteCustomerAddress = async ({ customerAccessToken, id }) => {
    let resp = await deleteCustomerAddressMutation({
      variables: {
        customerAccessToken,
        id,
      },
    });

    if (resp?.data?.customerAddressDelete?.deletedCustomerAddressId) {
      setAddress(null);
    }

    return resp?.data?.customerAddressDelete;
  };

  useEffect(() => {
    if (fetchCustomerAddressesResp?.data) {
      setAddresses(
        fetchCustomerAddressesResp?.data?.customer?.addresses?.edges.map(
          (e) => e.node
        )
      );
    }
  }, [fetchCustomerAddressesResp?.data]);

  useEffect(() => {
    setError(
      fetchCustomerAddressesResp?.error ||
        createCustomerAddressResp?.error ||
        updateCustomerAddressResp?.error ||
        updateCustomerAddressResp?.error
    );
  }, [
    fetchCustomerAddressesResp?.error,
    createCustomerAddressResp?.error,
    updateCustomerAddressResp?.error,
    deleteCustomerAddressResp?.error,
  ]);

  useEffect(() => {
    setLoading(
      fetchCustomerAddressesResp?.loading ||
        createCustomerAddressResp?.loading ||
        updateCustomerAddressResp?.loading ||
        deleteCustomerAddressResp?.loading
    );
  }, [
    fetchCustomerAddressesResp?.loading,
    createCustomerAddressResp?.loading,
    updateCustomerAddressResp?.loading,
    deleteCustomerAddressResp?.loading,
  ]);

  return {
    loading,
    error,
    address,
    addresses,
    updateCustomerAddress,
    createCustomerAddress,
    deleteCustomerAddress,
    fetchCustomerAddress,
    fetchCustomerAddresses,
  };
};

export default useAddresses;
