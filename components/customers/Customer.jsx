import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const Customer = ({ customer, styles, handleLogoutClick, ...props }) => (
  <Box sx={{ ...sx.root, ...styles }}>
    <Typography variant="h6">{customer.email}</Typography>
    <Button color="secondary" onClick={handleLogoutClick} sx={sx.button}>
      Sign out
    </Button>
  </Box>
);

Customer.propTypes = {
  customer: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

export default Customer;

const sx = {
  root: {},
  button: {
    minWidth: 0,
    p: 0,
    display: { xs: "inline-flex", md: "block" },
    ml: { xs: 0, md: "auto" },
  },
};
