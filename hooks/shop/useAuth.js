import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ShopContext } from "context";
import {
  MUTATION_ACCESS_TOKEN_CREATE,
  MUTATION_ACCESS_TOKEN_DELETE,
  MUTATION_ACCESS_TOKEN_RENEW,
  MUTATION_CUSTOMER_CREATE,
  MUTATION_CUSTOMER_RECOVER,
  MUTATION_CUSTOMER_RESET_BY_URL,
} from "graphql/shopify/auth";
import { deleteCookie, setCookie } from "cookies-next";

const useAuth = (props) => {
  const {
    customer,
    setCustomer,
    accessToken,
    setAccessToken,
    expiresAt,
    setExpiresAt,
  } = useContext(ShopContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [signInMutation, signInResp] = useMutation(
    MUTATION_ACCESS_TOKEN_CREATE
  );
  const [createCustomerMutation, createCustomerResp] = useMutation(
    MUTATION_CUSTOMER_CREATE
  );
  const [signOutMutation, signOutResp] = useMutation(
    MUTATION_ACCESS_TOKEN_DELETE
  );
  const [accessTokenRenewMutation, accessTokenRenewResp] = useMutation(
    MUTATION_ACCESS_TOKEN_RENEW
  );
  const [recoverMutation, recoverResp] = useMutation(MUTATION_CUSTOMER_RECOVER);
  const [resetByUrlMutation, resetByUrlResp] = useMutation(
    MUTATION_CUSTOMER_RESET_BY_URL
  );

  const signIn = async (customer) => {
    const { email, password } = customer || {};
    let user = await signInMutation({
      variables: {
        input: { email, password },
      },
    });
    return user?.data?.customerAccessTokenCreate;
  };

  const createCustomer = async (customer) => {
    try {
      const { firstName, lastName, email, password, acceptsMarketing } =
        customer || {};

      let user = await createCustomerMutation({
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
      return user?.data?.customerCreate;
    } catch (e) {
      console.log(e);
      setError("Creating Customer Limit exceeded. Please try again later.");
    }
  };

  const register = async (customer) => {
    let user = await createCustomer(customer);
    if (user?.customer?.id) {
      let signInResp = await signIn(customer);
      return signInResp;
    }
  };

  const signOut = async () => {
    let resp = await signOutMutation({
      variables: {
        customerAccessToken: accessToken,
      },
    });
    deleteCookie("shopifyAccessToken");
    return resp?.data;
  };

  const accessTokenRenew = async (token) => {
    let resp = await accessTokenRenewMutation({
      variables: {
        customerAccessToken: token,
      },
    });
    if (resp?.data?.customerAccessTokenRenew) {
      handleStoreAccessToken(
        resp?.data?.customerAccessTokenRenew?.customerAccessToken
      );
    }
    return resp?.data?.customerAccessTokenRenew;
  };

  const recover = async (email) => {
    await recoverMutation({
      variables: {
        email: email,
      },
    });
  };

  // Signing out is denied if access token is expired
  const deleteTokens = async () => {
    deleteCookie("shopifyAccessToken");
    deleteCookie("shopifyTokenExpiresAt");
  };

  const resetByUrl = async (password, resetUrl) => {
    let resp = await resetByUrlMutation({
      variables: {
        password,
        resetUrl,
      },
    });
    return resp?.data;
  };

  const handleStoreAccessToken = (customerAccessToken) => {
    const {
      accessToken: shopifyAccessToken,
      expiresAt: shopifyTokenExpiresAt,
    } = customerAccessToken || {};

    if (shopifyAccessToken && shopifyTokenExpiresAt) {
      setAccessToken(shopifyAccessToken);
      setExpiresAt(Date.parse(shopifyTokenExpiresAt));
      setCookie("shopifyAccessToken", shopifyAccessToken);
      setCookie("shopifyTokenExpiresAt", shopifyTokenExpiresAt);
    }
  };

  useEffect(() => {
    if (signInResp?.data) {
      handleStoreAccessToken(
        signInResp?.data?.customerAccessTokenCreate?.customerAccessToken
      );
    }
  }, [signInResp?.data]);

  useEffect(() => {
    if (resetByUrlResp?.data) {
      handleStoreAccessToken(
        resetByUrlResp.data?.customerResetByUrl?.customerAccessToken
      );
    }
  }, [resetByUrlResp?.data]);

  useEffect(() => {
    if (createCustomerResp?.data) {
      setCustomer(createCustomerResp?.data?.customerCreate);
      handleStoreAccessToken(
        createCustomerResp?.data?.customerCreate?.customerAccessToken
      );
      if (createCustomerResp?.data?.customerCreate?.customerUserErrors) {
        setError(
          createCustomerResp?.data?.customerCreate?.customerUserErrors[0]
        );
      }
    }
  }, [createCustomerResp?.data]);

  useEffect(() => {
    if (signOutResp?.data) {
      setAccessToken();
      setExpiresAt();
      deleteCookie("shopifyAccessToken");
      deleteCookie("shopifyTokenExpiresAt");
    }
  }, [signOutResp?.data]);

  useEffect(() => {
    setError({
      ...signInResp?.error,
      ...createCustomerResp?.error,
      ...signOutResp?.error,
      ...recoverResp?.error,
      ...resetByUrlResp?.error,
      ...accessTokenRenewResp?.error,
    });
  }, [
    signInResp?.error,
    createCustomerResp?.error,
    signOutResp?.error,
    recoverResp?.error,
    resetByUrlResp?.error,
    accessTokenRenewResp?.error,
  ]);

  useEffect(() => {
    setLoading(
      signInResp?.loading ||
        createCustomerResp?.loading ||
        signOutResp?.loading ||
        recoverResp?.loading ||
        resetByUrlResp?.loading ||
        accessTokenRenewResp?.loading
    );
  }, [
    signInResp?.loading,
    createCustomerResp?.loading,
    signOutResp?.loading,
    recoverResp?.loading,
    resetByUrlResp?.loading,
    accessTokenRenewResp?.loading,
  ]);

  return {
    accessToken,
    setAccessToken,

    expiresAt,
    setExpiresAt,

    customer,
    setCustomer,
    loading,
    error,
    signIn,
    signOut,
    register,
    recover,
    resetByUrl,
    accessTokenRenew,

    deleteTokens,
  };
};

export default useAuth;
