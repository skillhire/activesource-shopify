import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Modal } from "components";
import ContactForm from "./ContactForm";

const DEFAULT_CONTACT_INFO = {
  name: "",
  email: "",
  companyName: "",
};

const ContactModal = (props) => {
  const {
    title,
    submitCTAText,
    open,
    handleClose,
    handleConfirm,
    errors = {},
    loading = false,
  } = props || {};

  const [contactInfo, setContactInfo] = useState(DEFAULT_CONTACT_INFO);
  const updateContactInfo = (field) => 
    setContactInfo({
      ...contactInfo,
      [field.target.name]: field.target.value,
    });

  useEffect(() => {
    if (!open) {
      setContactInfo(DEFAULT_CONTACT_INFO);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      actions={
        <Box sx={sx.actions}>
          <Button
            size="medium"
            color="secondary"
            onClick={() => handleConfirm(contactInfo)}
            variant="contained"
            sx={sx.confirmButton}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} sx={sx.loader} />}
          >
            {submitCTAText || "Submit"}
          </Button>
        </Box>
      }
      handleClose={handleClose}
    >
      <Box sx={sx.content}>
        <Typography variant="h4" sx={sx.title}>
          {title || "Contact Us"}
        </Typography>
        <ContactForm
          contactInfo={contactInfo}
          handleChange={updateContactInfo}
          errors={errors}
        />
      </Box>
    </Modal>
  );
};

export default ContactModal;

const sx = {
  icon: {
    color: "secondary.main",
    height: 32,
    width: 32,
  },
  content: {
    width: {
      xs: "100%",
      md: 576,
    },
    px: {
      xs: 2,
      sm: 5,
    },
  },
  title: {
    textAlign: "center",
    mb: {
      xs: 4,
      sm: 6,
      md: 8,
    },
  },
  actions: {
    width: "100%",
    px: {
      xs: 2,
      sm: 5,
    },
  },
  confirmButton: {
    width: "100%",
  },
};
