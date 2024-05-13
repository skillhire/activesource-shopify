import React from "react";
import { useState } from "react";
import axios from "axios";

const useCloudinary = ({ cloudName, uploadPreset, apiKey, ...props }) => {
  const [loading, setLoading] = useState(false);

  //https://cloudinary.com/documentation/upload_images#generating_authentication_signatures
  const unsignedUpload = async (file) => {
    try {
      setLoading(true);

      const publicId = file?.name?.split(".")[0];
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const formData = new FormData();
      const timestamp = Date.now();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "assets");
      formData.append("public_id", publicId);
      formData.append("timestamp", timestamp);
      //formData.append('signature', signature)

      // Remove JWT token headers from app
      delete axios.defaults.headers.common["Authorization"];
      let resp = await axios.post(cloudinaryUrl, formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return resp;
    } catch (e) {
      console.log("Cloudinary error", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    unsignedUpload,
  };
};

export default useCloudinary;
