import PropTypes from "prop-types";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import { Close } from "@mui/icons-material";

const Modal = ({
  open,
  handleClose,
  title,
  actions,
  children,
  fullScreen = false,
  maxWidth = "md",
}) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle onClose={handleClose}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="row">
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box>
            <IconButton size="small" onClick={handleClose}>
              <Close size="small" sx={sx.closeIcon} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {children}
        {actions && <Box sx={sx.actions}>{actions}</Box>}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

const sx = {
  actions: {
    display: "flex",
    justifyContent: "center",
    mb: 4,
    gap: "10px",
  },
  closeIcon: {
    color: "primary.main",
  },
};
