import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { CustomizeContext } from "context";
import {
  Button,
  Stack,
  Typography,
  Box,
  CardActionArea,
  InputBase,
} from "@mui/material";
import { getMetaValue } from "utils";
import { useCloudinary, useColors } from "hooks";
import Image from "next/image";
import { Link } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";
import { getCookie, setCookie } from "cookies-next";

const Thumbnail = ({ src, handleClick, ...props }) => (
  <CardActionArea onClick={handleClick} sx={sx.cardActionArea}>
    <Image src={src} width={99} height={99} sx={sx.thumbnail} {...props} />
  </CardActionArea>
);

const ProductCustomize = ({
  color,
  product,
  hide,
  handleClick,
  handleUpload,
  handlePreviewClick,
  activeColor,
  setActiveColor,
}) => {
  const { customization, setCustomization, createBitlyLink } =
    useContext(CustomizeContext);

  const [frontFile, setFrontFile] = useState(false);
  const [backFile, setBackFile] = useState(false);

  const { colors, fetchColors } = useColors();

  const { unsignedUpload } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  });

  const frontRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (colors?.length > 0 && color) {
      const active = colors.find((c) => c.handle == color.handle);
      setActiveColor(active);
    }
  }, [colors, color]);

  const frontInputClick = () => {
    frontRef.current.click();
  };

  const backInputClick = () => {
    backRef.current.click();
  };

  const handleChange = async (ev) => {
    const { files, name } = ev.target;
    const file = files[0];
    const resp = await unsignedUpload(file);
    const image = resp?.data?.secure_url;

    let cookie = JSON.parse(getCookie("activesource") || "{}");
    cookie[name] = {
      name: file.name,
      image: image,
    };
    setCookie("activesource", JSON.stringify(cookie));

    if (name == "front") {
      setFrontFile(file);
    } else if (ev.target.name == "back") {
      setBackFile(file);
    }
    handleUpload(image, name);
  };

  const isBack = useMemo(
    () => getMetaValue(product, "back_placement"),
    [product]
  );
  const isFront = useMemo(
    () => getMetaValue(product, "front_placement"),
    [product]
  );

  useEffect(() => {
    let cookie = JSON.parse(getCookie("activesource") || "{}");
    if (cookie?.front) {
      setFrontFile(cookie?.front);
      setCustomization({
        ...customization,
        frontLogo: cookie?.front?.image,
      });
    }
    if (cookie?.back) {
      setBackFile(cookie?.back);
      setCustomization({
        ...customization,
        backLogo: cookie?.back?.image,
      });
    }
  }, []);

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
              <Button
                onClick={() => handleClick("front")}
                size="small"
                variant="outlined"
                sx={sx.button}
              >
                {customization?.front
                  ? `${customization?.front?.title} (${customization?.front?.dimensions})`
                  : "Select Placement"}
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
            <Box sx={sx.column}>
              <Button
                size="small"
                variant="outlined"
                sx={sx.button}
                startIcon={<CloudUpload />}
                onClick={frontInputClick}
              >
                {frontFile ? `${frontFile.name}` : "Choose file"}
              </Button>
              <input
                type="file"
                ref={frontRef}
                accept="image/*"
                hidden
                name="front"
                onChange={handleChange}
              />
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
              <Button
                onClick={() => handleClick("back")}
                size="small"
                variant="outlined"
                sx={sx.button}
              >
                {customization?.back
                  ? `${customization?.back?.title} (${customization?.back?.dimensions})`
                  : "Select Placement"}
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
            <Box sx={sx.column}>
              <Button
                size="small"
                variant="outlined"
                sx={sx.button}
                onClick={backInputClick}
                startIcon={<CloudUpload />}
              >
                {backFile ? `${backFile?.name}` : "Choose file"}
              </Button>
              <input
                type="file"
                ref={backRef}
                accept="image/*"
                hidden
                name="back"
                onChange={handleChange}
              />
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
                  handleClick={() =>
                    handlePreviewClick(activeColor?.front_placement, "front")
                  }
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
                  handleClick={() =>
                    handlePreviewClick(activeColor?.back_placement, "back")
                  }
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
    p: 0,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    my: 1,
  },
  button: {
    width: 176,
  },
  overline: {
    textAlign: "center",
    py: 1,
  },
};
