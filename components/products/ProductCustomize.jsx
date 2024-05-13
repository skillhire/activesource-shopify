import React, { useContext, useEffect } from "react";
import { CustomizeContext } from "context";
import { Stack, Typography } from "@mui/material";
import { getMetaValue } from "utils";
import { getCookie } from "cookies-next";
import FileUploader from "./customize/FileUploader";
import PlacementButton from "./customize/PlacementButton";
import PlacementImage from "./customize/PlacementImage";

const ProductCustomize = ({
  product,
  handleClick,
  handleUpload,
  handlePreviewClick,
  activeColor,
  activeImage,
}) => {
  const { customization, setCustomization } = useContext(CustomizeContext);

  const hasBackPlacement = getMetaValue(product, "back_placement") == "true";
  const hasFrontPlacement = getMetaValue(product, "front_placement") == "true";

  useEffect(() => {
    const cookie = JSON.parse(getCookie("activesource") || "{}");
    if (cookie?.front) {
      setCustomization({
        ...customization,
        print_logo_1: cookie.front?.image,
      });
    }
    if (cookie?.back) {
      setCustomization({
        ...customization,
        print_logo_2: cookie.back?.image,
      });
    }
  }, [product?.handle]);

  const { disableLogo, disablePlacement } = useContext(CustomizeContext);

  return (
    <Stack>
      {hasFrontPlacement && (
        <>
          <PlacementButton
            disablePlacement={disablePlacement}
            label={"Front"}
            name={"front"}
            handleClick={handleClick}
          />
          <FileUploader
            label={"Front"}
            name={"front"}
            handleUpload={handleUpload}
            disableLogo={disableLogo}
          />
        </>
      )}

      {hasBackPlacement && (
        <>
          <PlacementButton
            disablePlacement={disablePlacement}
            label={"Back"}
            name={"back"}
            handleClick={handleClick}
          />
          <FileUploader
            label={"Back"}
            name={"back"}
            handleUpload={handleUpload}
            disableLogo={disableLogo}
          />
        </>
      )}

      {activeColor && (hasBackPlacement || hasFrontPlacement) && (
        <Stack sx={sx.container}>
          <Typography variant="subtitle1" sx={sx.title}>
            Preview
          </Typography>
          <Stack direction="row" spacing={2}>
            {hasFrontPlacement && (
              <PlacementImage
                label="Front"
                src={activeColor?.front_placement}
                name="front"
                selected={activeImage?.url === activeColor?.front_placement}
                handleClick={handlePreviewClick}
              />
            )}
            {hasBackPlacement && (
              <PlacementImage
                label="Back"
                src={activeColor?.back_placement}
                selected={activeImage?.url === activeColor?.back_placement}
                name="back"
                handleClick={handlePreviewClick}
              />
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
    borderRadius: "8px",
    objectFit: "contain",
  },
  activeThumbnail: {
    border: "1px solid black",
  },
  cardActionArea: {
    p: 0,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
      color: "text.primary",
      borderColor: "secondary.light",
      bgcolor: "secondary.light",
    },
  },
  active: {
    borderColor: "secondary.light",
    bgcolor: "secondary.light",
    "&:hover": {
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
