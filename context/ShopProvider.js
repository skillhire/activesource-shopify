import React, { useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "apollo/client";
import { ShopContext } from "context";

const ShopProvider = ({ children, ...rest }) => {
  const apolloClient = useApollo();

  const [accessToken, setAccessToken] = useState();
  const [alert, setAlert] = useState({});
  const [checkout, setCheckout] = useState();
  const [customer, setCustomer] = useState();
  const [expiresAt, setExpiresAt] = useState();
  const [loading, setLoading] = useState(false);
  const [lineItemTotal, setLineItemTotal] = useState(0);
  const [shop, setShop] = useState();

  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleAuth = () => setAuthOpen(!authOpen);
  const toggleCart = () => setCartOpen(!cartOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const value = {
    accessToken,
    setAccessToken,

    alert,
    setAlert,

    expiresAt,
    setExpiresAt,

    customer,
    setCustomer,

    loading,
    setLoading,

    shop,
    setShop,

    authOpen,
    setAuthOpen,
    toggleAuth,

    cartOpen,
    setCartOpen,
    toggleCart,

    menuOpen,
    setMenuOpen,
    toggleMenu,

    checkout,
    setCheckout,
    lineItemTotal,
    setLineItemTotal,
  };

  return (
    <ShopContext.Provider value={value}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ShopContext.Provider>
  );
};

export default ShopProvider;
