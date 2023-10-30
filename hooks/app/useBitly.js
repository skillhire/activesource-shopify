import React, { useState } from "react";
import axios from "axios";

const useBitly = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [url, setUrl] = useState();

  const shortenUrl = async (link) => {
    let resp;
    try {
      setLoading(true);
      setError(null);
      resp = await axios.post(`/api/bitly`, {
        url: link,
      });
      setUrl(resp?.data?.data?.link);
    } catch (e) {
      console.log("Error", e);
      setError(e);
    } finally {
      setLoading(false);
    }
    return resp?.data?.data?.link;
  };

  return {
    loading,
    error,
    url,
    shortenUrl,
  };
};

export default useBitly;
