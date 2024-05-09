import React, { useEffect, useState, useContext } from "react";
import { CustomizeContext } from "context";

const CustomizeProvider = ({ children, ...rest }) => {

  const [activeColor, setActiveColor] = useState()
  const [activeImage, setActiveImage] = useState({ url: null });

  const [disableLogo, setDisableLogo] = useState(false)
  const [disablePlacement, setDisablePlacement] = useState(false)
  const [notForSale, setNotForSale] = useState(false)

  const [activePlacement, setActivePlacement] = useState({
    code: null,
    yPos: null, // Interger value in percentages
    xPos: null,
    width: null,
    height: null,
    printWidth: null, // Float value in inches
    printHeight: null
  })

  const [customization, setCustomization] = useState({    
    print_sku: null,    
    print_location_1: null, // Specific code for the warehous such as CF, FB
    print_url_1: null,  // Scaled to print size logo URL
    print_preview_1: null, // Logo + background preview image 
    print_type_1: 'DigitalPrint',
    print_logo_1: null, // The original uploaded logo 
    print_placement_1: {
      code: null,
      yPos: null, // Interger value in percentages
      xPos: null,
      width: null,
      height: null,
      printWidth: null, // Float value in inches
      printHeight: null
    },
    print_logo_2: null,
    print_location_2: null,
    print_preview_2: null,        
    print_url_2: null,
    print_type_2: 'DigitalPrint',    
    print_placement_2: {
      code: null,
      yPos: null,
      xPos: null,
      width: null,
      height: null,
      printWidth: null,
      printHeight: null
    },
  });
  
  const value = {
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

  return (
    <CustomizeContext.Provider value={value}>
      {children}
    </CustomizeContext.Provider>
  );
};

export default CustomizeProvider;
