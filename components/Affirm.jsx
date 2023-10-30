import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Affirm = (props) => {
  const { price } = props;
  useEffect(() => {
    if (price) {
      window.affirm.ui.refresh();
    }
  }, [price]);
  return price ? (
    <Typography
      className="affirm-as-low-as"
      data-page-type="category"
      data-amount={price * 100}
      variant="body2"
      sx={sx.root}
    />
  ) : null;
};

export default Affirm;

const sx = {
  root: {
    "& a": {
      color: "text.primary",
      fontSize: 12,
      fontFamily: (theme) => theme.typography.button.fontFamily,
      textTransform: (theme) => theme.typography.button.textTransform,
    },
  },
};
