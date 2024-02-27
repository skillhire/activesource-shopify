import React from "react";
import { Typography } from "@mui/material";
import Panel from "./Panel";
import AddToCartButtons from "./AddToCartButtons";

const StartPanel = (props) => {
  return (
    <Panel
      title="Customize"
      height={700}
      actions={
        <AddToCartButtons
          handleConfirm={() => setConfirmOpen(true)}
          handleCancel={() => setCancelOpen(true)}
        />
      }
    >
      <Typography variant="body1" sx={sx.subtitle}>
        Customize your product.
      </Typography>
    </Panel>
  );
};

export default StartPanel;

const sx = {
  root: {},
  subtitle: {
    my: 2,
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: "20px",
    my: 2,
  },
  listItem: {
    border: "1px solid",
    borderColor: "common.divider",
    borderRadius: 6,
    mb: 1,
    "& .MuiListItemButton-root": {
      borderRadius: 6,
    },
  },
  secondaryAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  images: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "5px",
  },
  linkButton: {
    my: 2,
    textDecoration: "underline",
  },
};
