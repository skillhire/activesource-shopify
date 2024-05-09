import React, { useEffect, useState, useContext } from "react";
import { CustomizeContext } from "context";

const CustomizeProvider = ({ children, ...rest }) => {

  const [customization, setCustomization] = useState({
    front: null,
    back: null,
    print_sku: null,    
    print_location_1: null,
    print_url_1: null,    
    print_preview_1: null,
    print_type_1: 'DigitalPrint',
    print_location_2: null,
    print_preview_2: null,        
    print_url_2: null,
    print_type_2: 'DigitalPrint',
  });
  const value = {
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
