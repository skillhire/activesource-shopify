import React from "react";
import { Modal } from "components";
import { Typography, Box, CardActionArea, Grid } from "@mui/material";
import { PIXELS_PER_INCH } from "constants/shop";
import Image from "next/image";

const PlacementModal = ({
  open,
  handleClose,
  frontOrBack,
  activePlacement,
  placements,
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
        <Grid container spacing={0.5}>
          {placements[frontOrBack]?.map((p, i) => (
            <Grid item xs={6} sm={6} md={3} key={i}>
              <Box sx={sx.imageContainer}>
                <CardActionArea
                  sx={{
                    ...sx.button,
                    ...(p.id === activePlacement?.id && sx.active),
                  }}
                  disableRipple
                  onClick={() => handleClick(p)}
                >
                  <Image
                    height={300}
                    width={300}
                    unoptimized
                    src={p?.previewSrc}
                    layout="responsive"
                  />
                  <Typography variant="button" sx={sx.title}>
                    {p.title}
                  </Typography>
                  <Typography variant="button">{p.dimensions}</Typography>
                  <Typography color="secondary" variant="caption">
                    {p.widthInches * PIXELS_PER_INCH}px x{" "}
                    {p.heightInches * PIXELS_PER_INCH}px
                  </Typography>
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
    p: {
      sm: 2,
      xs: 0,
    },
    width: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  },
  active: {
    bgcolor: "secondary.light",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: {
      sm: "180px",
      sx: "100px",
    },
    minWidth: {
      sm: "180px",
      sx: "100px",
    },
  },
  content: {
    p: {
      sm: 2,
      xs: 0,
    },
    width: "100%",
  },
  title: {
    mt: 2,
  },
};
