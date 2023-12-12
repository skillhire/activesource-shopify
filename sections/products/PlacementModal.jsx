import React from "react";
import { Modal } from "components";
import { Box, CardActionArea, Grid } from "@mui/material";
import { PLACEMENTS } from "constants/placements";
import Image from "next/image";

const PlacementModal = ({
  open,
  handleClose,
  frontOrBack,
  placement,
  handleClick,
}) => {
  return (
    <Modal
      title={`Select ${frontOrBack} placement`}
      open={open}
      handleClose={handleClose}
      maxWidth="md"
    >
      <Box sx={sx.content}>
        <Grid container spacing={0}>
          {PLACEMENTS[frontOrBack]?.map((p, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <Box sx={sx.imageContainer}>
                <CardActionArea
                  sx={{
                    ...sx.button,
                    ...(p.id === placement?.id && sx.active),
                  }}
                  disableRipple
                  onClick={() => handleClick(p)}
                >
                  <Image height={160} width={160} src={p?.previewSrc} />
                </CardActionArea>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default PlacementModal;

const sx = {
  button: {
    p: 2,
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  active: {
    bgcolor: "secondary.light",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "180px",
    minWidth: "180px",
  },
  content: {
    p: 2,
    width: "100%",
  },
};
