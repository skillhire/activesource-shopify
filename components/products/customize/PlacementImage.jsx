import React from "react";
import {
  Stack,
  Typography,
  CardActionArea,
} from "@mui/material";
import Image from "next/image";

const PlacementImage = ({ label, src, selected = false, name, handleClick }) => (
  <Stack>    
    <CardActionArea onClick={() => handleClick(src, name)} sx={sx.cardActionArea}>
      <Image
        src={src}
        width={100}
        height={100}
        style={{
          ...(selected && sx.activeThumbnail),
          borderRadius: "8px",
          backgroundColor: "white",
          objectFit: "contain",
        }}
      />
    </CardActionArea>
    <Typography variant="overline" sx={sx.overline}>
      {label}
    </Typography>
  </Stack>
);

export default PlacementImage;

const sx = {
  thumbnail: {
    borderRadius: "8px",
    objectFit: "contain",
  },
  activeThumbnail: {
    border: "1px solid black",
  },
  cardActionArea: {
    p: 0,
  },
  row: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  overline: {
    textAlign: "center",
    py: 1,
  },
};
