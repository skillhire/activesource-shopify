import React, { useRef, useState, useContext, useEffect, useMemo } from "react";
import { CustomizeContext } from "context";
import { useAlerts } from "hooks";
import {
  Button,
  Stack,
  Typography,
  CircularProgress,
  CardActionArea,
} from "@mui/material";
import { getMetaValue } from "utils";
import { useCloudinary } from "hooks";
import Image from "next/image";
import { Link } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import {
  MAX_FILE_SIZE,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";
import { getCookie, setCookie } from "cookies-next";

const Thumbnail = ({ src, handleClick, selected = false, ...props }) => (
  <CardActionArea onClick={handleClick} sx={sx.cardActionArea}>
    <Image
      src={src}
      width={100}
      height={145}
      style={{
        ...(selected && sx.activeThumbnail),
        borderRadius: "8px",
        backgroundColor: "white",
        objectFit: "contain",
      }}
    />
  </CardActionArea>
);

const ImagePreview = ({ label, src, selected = false, name, handleClick }) => (
  <Stack>
    <Thumbnail
      selected={selected}
      handleClick={() => handleClick(src, name)}
      src={src}
      alt="Product thumbnail"
    />
    <Typography variant="overline" sx={sx.overline}>
      {label}
    </Typography>
  </Stack>
);

const FileUploader = ({ label, name, handleClick, handleUpload, ...props }) => {
  const { showAlertError } = useAlerts();

  const ref = useRef();
  const [file, setFile] = useState();
  const { customization, setCustomization } = useContext(CustomizeContext);

  const { loading, unsignedUpload } = useCloudinary({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    uploadPreset: CLOUDINARY_UPLOAD_PRESET,
  });

  const fileInputClick = () => {
    ref.current.click();
  };

  const handleChange = async (ev) => {
    const { files } = ev.target;
    const file = files[0];
    if (file?.size > MAX_FILE_SIZE) {
      showAlertError(
        "File size is too big. Please upload a file less than 5Mb"
      );
      return;
    }
    const resp = await unsignedUpload(file);
    const image = resp?.data?.secure_url;

    let cookie = JSON.parse(getCookie("activesource") || "{}");
    cookie[name] = {
      name: file.name,
      image: image,
    };
    setCookie("activesource", JSON.stringify(cookie));
    setFile(file);
    handleUpload(image, name);
  };

  useEffect(() => {
    let cookie = JSON.parse(getCookie("activesource") || "{}");
    if (cookie[name]) {
      setFile(cookie[name]);
    }
  }, [name]);

  return (
    <>
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
              ...(customization[name] && sx.active),
            }}
          >
            {customization[name]
              ? `${customization[name].title} (${customization[name]?.dimensions})`
              : "Select Placement"}
          </Button>
        </Stack>
        <Link variant="overline" color="text.secondary">
          Placement Guide
        </Link>
      </Stack>
      <Stack spacing={1} sx={sx.container}>
        <Typography variant="subtitle1" sx={sx.title}>
          {label} Design
        </Typography>
        <Stack direction="row" spacing={1} sx={sx.row}>
          <Button
            size="small"
            variant="outlined"
            sx={{
              ...sx.button,
              ...(file && sx.active),
            }}
            startIcon={<CloudUpload />}
            endIcon={loading && <CircularProgress size={20} sx={sx.loading} />}
            onClick={fileInputClick}
          >
            Choose file
          </Button>
          <Typography variant="caption">{file?.name}</Typography>
          <input
            type="file"
            ref={ref}
            accept="image/*"
            hidden
            name={name}
            onChange={handleChange}
          />
        </Stack>
        <Typography variant="caption">
          Support: PNG only | Max File Size: 5Mb | Resolution: 12’ x 16’
        </Typography>
      </Stack>
    </>
  );
};

const ProductCustomize = ({
  product,
  handleClick,
  handleUpload,
  handlePreviewClick,
  activeColor,
  activeImage,
}) => {
  const { customization, setCustomization } = useContext(CustomizeContext);

  const isBack = useMemo(
    () => getMetaValue(product, "back_placement"),
    [product]
  );
  const isFront = useMemo(
    () => getMetaValue(product, "front_placement"),
    [product]
  );

  useEffect(() => {
    const cookie = JSON.parse(getCookie("activesource") || "{}");
    if (cookie?.front || cookie?.back) {
      setCustomization({
        ...customization,
        frontLogo: cookie.front?.image,
        backLogo: cookie.back?.image,
      });
    }
  }, []);

  if (!activeColor) return null;

  return (
    <Stack>
      {isFront === "true" && (
        <FileUploader
          label={"Front"}
          name={"front"}
          handleClick={handleClick}
          handleUpload={handleUpload}
        />
      )}
      {isBack === "true" && (
        <FileUploader
          label={"Back"}
          name={"back"}
          handleClick={handleClick}
          handleUpload={handleUpload}
        />
      )}
      {(isFront === "true" || isBack === "true") && (
        <Stack sx={sx.container}>
          <Typography variant="subtitle1" sx={sx.title}>
            Preview
          </Typography>
          <Stack direction="row" spacing={2}>
            {isFront === "true" && (
              <ImagePreview
                label="Front"
                src={activeColor?.front_placement}
                name="front"
                selected={activeImage?.src === activeColor?.front_placement}
                handleClick={handlePreviewClick}
              />
            )}
            {isBack === "true" && (
              <ImagePreview
                label="Back"
                src={activeColor?.back_placement}
                selected={activeImage?.src === activeColor?.back_placement}
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
  },
  active: {
    bgcolor: "secondary.light",
    "&:hover": {
      bgcolor: "secondary.light",
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
