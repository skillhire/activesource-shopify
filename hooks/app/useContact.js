import React, { useState } from "react";
import { useAlerts } from "hooks";
import axios from "axios";

const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const { showAlertSuccess, showAlertError } = useAlerts();

  const sendContactEmail = (contactInfo) => {
    setLoading(true);
    setErrors(null);
    return axios
      .post("/api/contact", contactInfo)
      .then((res) => {
        showAlertSuccess("Your message has been sent!");
        return res.data;
      })
      .catch((error) => {
        setErrors(error);
        showAlertError(error.response.data.message);
        throw new Error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    errors,
    sendContactEmail,
  };
};

export default useContact;
