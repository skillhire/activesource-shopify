import React, { useState, useEffect } from "react";
import { Alert, Cart, MetaFields } from "components";
import { Box, Container, Modal, TextField, Button, Typography } from "@mui/material";
import StorefrontFooter from "./StorefrontFooter";
import StorefrontHeader from "./StorefrontHeader";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "theme";
import { createTheme } from "@mui/material/styles";

export default function Layout({ children, storefront, ...props }) {
  const { name, handle, password } = storefront || {};

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const storageKey = `storefront_access_${handle}`;

  useEffect(() => {
    if (handle && password) {
      const storedAccess = localStorage.getItem(storageKey);
      if (storedAccess === "true") {
        setAccessGranted(true);
      }
    }
  }, [handle, password, storageKey]);

  const handlePasswordSubmit = () => {
    if (passwordInput === password) {
      localStorage.setItem(storageKey, "true");
      setAccessGranted(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const showPasswordModal = password && !accessGranted;

  const customTheme = {
    ...muiTheme,
    palette: {
      ...muiTheme.palette,
      secondary: {
        main: storefront?.primary_color || '#000000'
      },
    }
  }


  return (
    <ThemeProvider
      theme={createTheme(customTheme)}
    >
        <MetaFields title={name} />
        <Alert />
        <Cart />
        <Modal
          open={showPasswordModal}
          aria-labelledby="password-modal-title"
        >
          <Box sx={sx.modal}>
            <Typography id="password-modal-title" variant="h6" sx={{ mb: 2 }}>
              Password Required
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Please enter the password to access this storefront.
            </Typography>
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={handleKeyPress}
              error={passwordError}
              helperText={passwordError ? "Incorrect password" : ""}
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handlePasswordSubmit}
            >
              Submit
            </Button>
          </Box>
        </Modal>
        <StorefrontHeader storefront={storefront} />
        <Box sx={sx.root}>
          <Box sx={sx.container}>
            <Container maxWidth={"lg"}>
              {children}
            </Container>
          </Box>
          <StorefrontFooter name={name} />
        </Box>
    </ThemeProvider>
  );
}

const sx = {
  root: {
    height: {
      sm: "calc(100vh-64px)",
      xs: "calc(100vh-50px)",
    },
    overflowX: "hidden",
  },
  footer: {},
  container: {
    minHeight: "calc(100vh - 164px)",
    mt: {
      sm: "64px",
      xs: "50px",
    },
    backgroundColor: "background.shade3",
    pb: 6
  },
  disableScroll: {
    overflow: "hidden",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  },
};
