import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Modal } from "components";

const AlertModal = (props) => {
  const {
    open,
    title = "Are you sure?",
    subtitle = "Please confirm or cancel",
    handleClose,
    handleConfirm,
  } = props || {};

  return (
    <Modal
      open={open}
      maxWidth={"md"}
      actions={
        <Box sx={sx.actions}>
          <Button
            color="primary"
            onClick={handleConfirm}
            variant="outlined"
            sx={sx.confirmButton}
          >
            Yes
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleClose}
            sx={sx.cancelButton}
          >
            No Thanks
          </Button>
        </Box>
      }
      handleClose={handleClose}
    >
      <Box sx={sx.content}>
        <Typography variant="h6" sx={sx.title}>
          {title}
        </Typography>
        <Typography variant="body2" sx={sx.subtitle}>
          {subtitle}
        </Typography>
      </Box>
    </Modal>
  );
};

export default AlertModal;

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
    maxWidth: "480px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    mb: 2,
  },
  subtitle: {
    textAlign: "center",
    mb: 4,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    mx: {
      xs: 2,
      sm: 0,
    },
  },
  confirmButton: {
    minWidth: {
      xs: "120px",
      sm: "160px",
    },
  },
  cancelButton: {
    minWidth: {
      xs: "120px",
      sm: "160px",
    },
    border: "none",
    "&:hover": {
      border: "none",
    },
  },
};
