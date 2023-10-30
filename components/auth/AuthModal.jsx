import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal, Typography } from "@mui/material";
import { SignInForm, SignOut, RegisterForm } from "components";
import { ArrowBack } from "@mui/icons-material";
import { ShopContext } from "context";
import { getCookie } from "cookies-next";

const Auth = ({ styles, ...props }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const { authOpen, toggleAuth, accessToken, setAccessToken, setExpiresAt } =
    useContext(ShopContext);

  const handleSignInToggle = () => {
    setShowSignIn(!showSignIn);
  };

  // Entry point in the app to establish auth
  useEffect(() => {
    let accessToken = getCookie("shopifyAccessToken");
    let expiresAt = getCookie("shopifyTokenExpiresAt");
    if (accessToken) {
      setAccessToken(accessToken);
      setExpiresAt(expiresAt);
    }
  }, []);

  return (
    <Modal open={authOpen} onClose={toggleAuth}>
      <Box
        px={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        width="100%"
        sx={{ ...sx.root, ...styles }}
      >
        <Box>
          <Button
            sx={sx.backButton}
            onClick={toggleAuth}
            startIcon={<ArrowBack />}
          >
            Continue Shopping
          </Button>
        </Box>
        {!accessToken?.length > 0 ? (
          showSignIn ? (
            <Box sx={sx.signInContainer}>
              <Typography variant="h5">Sign In</Typography>
              <SignInForm onSuccess={handleSignInToggle} />
            </Box>
          ) : (
            <Box sx={sx.signInContainer}>
              <Typography variant="h5">Register</Typography>
              <RegisterForm onSuccess={handleSignInToggle} />
            </Box>
          )
        ) : (
          <>
            <Typography variant="h6">Welcome back!</Typography>
            <SignOut />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default Auth;

Auth.propTypes = {
  styles: PropTypes.object,
};

const sx = {
  root: {
    width: {
      sm: 400,
      xs: "100vw",
    },
  },
  backButton: {
    my: 2,
  },
  title: {
    m: 0,
  },
};
