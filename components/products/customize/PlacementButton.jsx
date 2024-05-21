import React, { useContext } from "react";
import { CustomizeContext } from "context";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "@mui/material";

const PlacementButton = ({
  label,
  disablePlacement = false,
  name,
  handleClick,
}) => {
  const { customization } = useContext(CustomizeContext);

  let placement = {};
  if (name === "front") {
    placement = customization?.print_placement_1;
  } else if (name === "back") {
    placement = customization?.print_placement_2;
  }

  if (disablePlacement) return null;
  return (
    <Stack spacing={1} sx={sx.container}>
      <Typography variant="subtitle1" sx={sx.title}>
        {label} Placement
      </Typography>
      <Stack direction="row" spacing={1} sx={sx.row}>
        <Button
          onClick={() => handleClick(name)}
          size="small"
          variant="outlined"
          sx={{
            ...sx.button,
            ...(placement?.code && sx.active),
          }}
        >
          {placement?.title
            ? `${placement.title} (${placement?.dimensions})`
            : "Select Placement"}
        </Button>
      </Stack>
      <Link
        variant="overline"
        color="text.secondary"
        href="/placement-guide"
        target="_blank"
      >
        Custom Placement
      </Link>
    </Stack>
  );
};

export default PlacementButton;

const sx = {
  container: {
    my: 1,
  },
  row: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    my: 1,
  },
  button: {
    minWidth: 176,
    maxwidth: 220,
    "&:hover": {
      color: 'secondary.contrastText',
      borderColor: "secondary.light",
      bgcolor: "secondary.light",
    },
  },
  active: {
    color: 'secondary.contrastText',
    borderColor: "secondary.light",
    bgcolor: "secondary.light",
    "&:hover": {
      color: 'secondary.contrastText',
      bgcolor: "secondary.light",
      borderColor: "secondary.light",
    },
  },
  overline: {
    textAlign: "center",
    py: 1,
  },
  loading: {
    height: "20px",
    width: "20px",
    color: "text.primary",
  },
};
