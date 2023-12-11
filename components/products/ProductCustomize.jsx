import React, { useState, useEffect, useMemo } from "react";
import { Button, Stack, Typography, Box, CardActionArea } from "@mui/material";
import { getMetaValue } from "utils";
import { useColors } from "hooks";
import Image from "next/image";
import { Link } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const Thumbnail = ({ src, handleClick, ...props }) => (
  <CardActionArea onClick={handleClick} sx={sx.cardActionArea}>
    <Image src={src} width={99} height={99} sx={sx.thumbnail} {...props} />
  </CardActionArea>
);

const ProductCustomize = ({ color, product, hide, handleClick }) => {
  const [activeColor, setActiveColor] = useState();
  const { colors, fetchColors } = useColors();

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (colors?.length > 0 && color) {
      const active = colors.find((c) => c.handle == color.handle);
      setActiveColor(active);
    }
  }, [colors, color]);

  const isBack = useMemo(
    () => getMetaValue(product, "back_placement"),
    [product]
  );
  const isFront = useMemo(
    () => getMetaValue(product, "front_placement"),
    [product]
  );

  if (hide) {
    return null;
  }

  return (
    <Stack>
      {isFront === "true" && (
        <>
          <Stack spacing={1} sx={sx.container}>
            <Typography variant="subtitle1" sx={sx.title}>
              Front Placement
            </Typography>
            <Box>
              <Button onClick={() => handleClick("front")} size="small" variant="outlined" sx={sx.button}>
                Select Placement
              </Button>
            </Box>
            <Link variant="overline" color="text.secondary">
              Placement Guide
            </Link>
          </Stack>
          <Stack spacing={1} sx={sx.container}>
            <Typography variant="subtitle1" sx={sx.title}>
              Front Design
            </Typography>
            <Box>
              <Button
                size="small"
                variant="outlined"
                sx={sx.button}
                startIcon={<CloudUpload />}
              >
                Choose file
              </Button>
            </Box>
            <Typography variant="caption">
              Support: PNG only | Max File Size: 5Mb | Resolution: 12’ x 16’
            </Typography>
          </Stack>
        </>
      )}
      {isBack === "true" && (
        <>
          <Stack spacing={1} sx={sx.container}>
            <Typography variant="subtitle1" sx={sx.title}>
              Back Placement
            </Typography>
            <Box>
              <Button onClick={() => handleClick("back")} size="small" variant="outlined" sx={sx.button}>
                Select Placement
              </Button>
            </Box>
            <Link variant="overline" color="text.secondary">
              Placement Guide
            </Link>
          </Stack>
          <Stack spacing={1} sx={sx.container}>
            <Typography variant="subtitle1" sx={sx.title}>
              Back Design
            </Typography>
            <Box>
              <Button
                size="small"
                variant="outlined"
                sx={sx.button}
                startIcon={<CloudUpload />}
              >
                Choose file
              </Button>
            </Box>
            <Typography variant="caption">
              Support: PNG only | Max File Size: 5Mb | Resolution: 12’ x 16’
            </Typography>
          </Stack>
        </>
      )}
      {(isFront === "true" || isBack === "true") && (
        <Stack sx={sx.container}>
          <Typography variant="subtitle1" sx={sx.title}>
            Preview
          </Typography>
          <Stack direction="row" spacing={2}>
            {isFront === "true" && (
              <Stack>
                <Thumbnail
                  src={activeColor?.front_placement}
                  alt="Product's front thumbnail"
                />
                <Typography variant="overline" sx={sx.overline}>
                  Front
                </Typography>
              </Stack>
            )}
            {isBack === "true" && (
              <Stack>
                <Thumbnail
                  src={activeColor?.back_placement}
                  alt="Product's back thumbnail"
                />
                <Typography variant="overline" sx={sx.overline}>
                  Back
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductCustomize;

const sx = {
  container: {
    my: 1,
  },
  thumbnail: {    
    objectFit: "contain",
  },
  cardActionArea: {
    p: 0
  },
  title: {
    my: 1,
  },
  button: {
    minWidth: 176,
  },
  overline: {
    textAlign: "center",
    py: 1,
  },
};
