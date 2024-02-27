import React, { useContext } from "react";
import {
  IconButton,
  Typography,
  Slide,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { ShopContext } from "context";
import { Close } from "@mui/icons-material";

const TransitionUp = (props) => <Slide {...props} direction="up" />;

const Alert = ({ ...props }) => {
  const { alert, setAlert } = useContext(ShopContext);
  const handleClose = () => setAlert();
  return (
    <Snackbar
      open={alert?.message ? true : false}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
      autoHideDuration={2500}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <SnackbarContent
        sx={sx.alert}
        message={
          <Typography variant="caption" color="white">
            {alert?.message}
          </Typography>
        }
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close sx={sx.close} />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default Alert;

const sx = {
  alert: {
    backgroundColor: "primary.main",
    color: "common.white",
  },
};
