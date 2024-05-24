import React from "react";
import Image from "next/image";
import { Box, Link, Typography, IconButton } from "@mui/material";
import HelpIcon from "assets/help-icon.svg";

const ProductContactSupport = ({handleButtonClick}) => {
  return (
    <Box sx={sx.root}>
      <IconButton disabled sx={sx.iconButton}>
        <Image
          responsive="true"
          src={HelpIcon}
          alt="Icon"
          width={15}
          height={15}
        />
      </IconButton>
      <Box>
        <Typography variant="body2" sx={sx.helpText}>
          Need help with designing, uploading your files or placements? {" "}
          <Link color="secondary" variant="link" sx={sx.supportButton} onClick={handleButtonClick}>Contact Support</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductContactSupport;

const sx = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    fontWeight: 600,
  },
  iconButton: {
    background: (theme) => `${theme.palette.tertiary.main} !important`,
    borderRadius: "8px !important",
    height: 28,
    p: 0,
    width: 28,
    mr: '10px',
  },
  supportButton: {
    fontSize: 14,
    cursor: "pointer",
    textDecoration: "underline",
  },
};