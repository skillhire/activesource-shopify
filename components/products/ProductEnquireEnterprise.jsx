import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Modal } from "components";
import EnterpriseContactForm from "../enterprise/EnterpriseContactForm";

const DEFAULT_CONTACT_INFO = {
  name: "",
  email: "",
  companyName: "",
};

const ProductEnquireEnterpriseModal = (props) => {
  const {
    open,
    handleClose,
    handleConfirm,
  } = props || {};

  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);

  return (
    <Modal
      open={open}
      maxWidth={false}
      actions={
        <Box sx={sx.actions}>
          <Button
            size="medium"
            color="secondary"
            onClick={handleConfirm}
            variant="contained"
            sx={sx.confirmButton}
          >
            Enquire Now
          </Button>
        </Box>
      }
      handleClose={handleClose}
    >
      <Box sx={sx.content}>
        <Typography variant="h4" sx={sx.title}>
          Enquire for Enterprise Products
        </Typography>
        <EnterpriseContactForm
          contactInfo={contactInfo}
          handleChange={(field) => setContactInfo({
            ...contactInfo,
            [field.target.name]: field.target.value}
          )}
        />
      </Box>
    </Modal>
  );
};

export default ProductEnquireEnterpriseModal;

const sx = {
  icon: {
    color: "secondary.main",
    height: 32,
    width: 32,
  },
  content: {
    px: {
      xs: 2,
      sm: 6,
    },
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    mb: 5.5,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    mx: {
      xs: 2,
      sm: 0,
    },
  },
  confirmButton: {
    width: "100%",
    maxWidth: 467,
  },
};
