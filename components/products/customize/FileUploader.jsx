import React, { useRef, useState, useEffect, useMemo } from "react";
import { useAlerts } from "hooks";
import { Button, Stack, Typography, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useCloudinary } from "hooks";
import {
  MAX_FILE_SIZE,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_UPLOAD_PRESET,
} from "constants/shop";
import { getCookie, setCookie } from "cookies-next";

const FileUploader = ({
  label,
  disableLogo = false,
  name,
  handleUpload,
  ...props
}) => {
  const { showAlertError } = useAlerts();

  const ref = useRef();
  const [file, setFile] = useState();

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
    setFile(cookie[name]);
  }, [name]);

  if (disableLogo) return null;
  return (
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
            ...(file && sx.activeButton),
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
          accept="image/png"
          hidden
          name={name}
          onChange={handleChange}
        />
      </Stack>
      <Typography variant="overline">
        <b>File requirements:</b> PNG format with transparency, less than 5Mb,
        300 PPI resolution
      </Typography>
    </Stack>
  );
};

export default FileUploader;

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
      color: "text.primary",
      borderColor: "secondary.light",
      bgcolor: "secondary.light",
    },
  },
  activeButton: {
    borderColor: "secondary.light",
    bgcolor: "secondary.light",
    "&:hover": {
      bgcolor: "secondary.light",
      borderColor: "secondary.light",
    },
  },
};
