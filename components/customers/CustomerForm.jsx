import React from "react";
import PropTypes from "prop-types";
import { Button, Box, CircularProgress, TextField } from "@mui/material";

const CustomerForm = ({
  loading,
  customer,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <Box sx={sx.root}>
      <Box sx={sx.fields}>
        <TextField
          fullWidth
          placeholder="First Name"
          name="firstName"
          variant="outlined"
          value={customer?.firstName || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          placeholder="Last Name"
          name="lastName"
          variant="outlined"
          value={customer?.lastName || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={sx.fields}>
        <TextField
          fullWidth
          placeholder="Email"
          name="email"
          variant="outlined"
          value={customer?.email || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          placeholder="Phone number"
          name="phone"
          variant="outlined"
          value={customer?.phone || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={sx.fields}>
        <TextField
          fullWidth
          placeholder="Change Password"
          name="password"
          variant="outlined"
          value={customer?.password || ""}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          placeholder="Change Password Confirmation"
          name="passwordConfirmation"
          variant="outlined"
          value={customer?.passwordConfirmation || ""}
          onChange={handleChange}
        />
      </Box>
      <Box sx={sx.actions}>
        <Button
          sx={sx.button}
          color="secondary"
          endIcon={
            loading && (
              <CircularProgress disableShrink size={20} sx={sx.progress} />
            )
          }
          variant="contained"
          onClick={handleSubmit}
        >
          Update Account
        </Button>
        <Button sx={sx.button} color="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

CustomerForm.propTypes = {
  loading: PropTypes.bool,
  customer: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default CustomerForm;

const sx = {
  root: {},
  button: {
    my: "10px",
    mr: "10px",
  },
  boxButton: {
    display: "flex",
    my: 1,
    flexDirection: { xs: "column", sm: "row" },
  },
  labelButton: {
    my: "10px",
    mx: "10px",
    fontWeight: "bold",
    pt: "6px",
    pb: "4px",
    px: "10px",
  },
  progress: {
    color: "common.white",
  },
  fields: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    flexDirection: { md: "row", sm: "column", xs: "column" },
    gap: "10px",
    my: 2,
    mx: 0,
  },
  cardButton: {
    bgcolor: "common.white",
    borderWidth: 0,
    width: { md: "100%", sm: "70vw", xs: "90vw" },
    borderRadius: "10px",
  },
  cardContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};
