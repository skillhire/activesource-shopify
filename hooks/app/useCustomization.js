import React, { useContext } from 'react' 
import { CustomizeContext } from 'context'

const useCustomization = () => {

  const {
    loading,
    setLoading,
    disableLogo,
    setDisableLogo,
    disablePlacement,
    setDisablePlacement,
    notForSale,
    setNotForSale,
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
    notForSale,
    setNotForSale,
    activeColor,
    setActiveColor,
    activeImage,
    setActiveImage,
    activePlacement,
    setActivePlacement,
    customization,
    setCustomization,
  }; 
}

export default useCustomization 
