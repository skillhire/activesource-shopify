import React, { useState } from "react";
import api from "api";

const useKlaviyo = (props) => {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email) => {
    try {
      setLoading(true);
      const resp = await api.post("/api/subscribe", {
        email,
      });
      return resp?.data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async (email) => {
    try {
      setLoading(true);
      const resp = await api.post("/api/v1/klaviyo/unsubscribe", {
        email,
      });
      return resp?.data;
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    subscribe,
    unsubscribe,
  };
};

export default useKlaviyo;
