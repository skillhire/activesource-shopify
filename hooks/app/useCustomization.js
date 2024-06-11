import React, { useContext } from "react";
import { CustomizeContext } from "context";

const useCustomization = () => {
  const {
    loading,
    setLoading,
    disableLogo,
    setDisableLogo,
    disablePlacement,
    setDisablePlacement,
    activeImage,
    setActiveImage,
    activePlacement,
    setActivePlacement,
    activeColor,
    setActiveColor,
    customization,
    setCustomization,
  } = useContext(CustomizeContext);

  return {
    loading,
    setLoading,
    disableLogo,
    setDisableLogo,
    disablePlacement,
    setDisablePlacement,
    activeColor,
    setActiveColor,
    activeImage,
    setActiveImage,
    activePlacement,
    setActivePlacement,
    customization,
    setCustomization,
  };
};

export default useCustomization;
