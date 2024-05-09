import React, { useContext } from 'react' 
import { CustomizeContext } from 'context'

const useCustomization = () => {

  const {
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
