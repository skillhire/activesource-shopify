import React, { useContext } from "react";
import { AppContext } from "context";

const useLoaders = (props) => {
  const { loading, setLoading } = useContext(AppContext);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return {
    loading,
    setLoading,
    showLoading,
    hideLoading,
  };
};

export default useLoaders;
