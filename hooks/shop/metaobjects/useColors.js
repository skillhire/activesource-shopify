import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const useColors = () => {
  const [colors, setColors] = useState([]);

  const {
    getReferences,
    getReference,
    getValue,
    getImage,
    metaobjects,
    fetchMetaobjects,
    loading,
    error,
  } = useMetaobject();

  const fetchColors = async () => {
    await fetchMetaobjects("color", 100);
  };

  useEffect(() => {
    if (metaobjects) {
      let _colors = metaobjects.map((color) => ({
        id: color.id,
        handle: color.handle,
        name: getValue(color, "name"),
        color: getValue(color, "color"),
        back_placement: getImage(color, "back_placement"),
        front_placement: getImage(color, "front_placement"),
      }));
      setColors(_colors);
    }
  }, [metaobjects]);

  return {
    loading,
    error,
    colors,
    fetchColors,
  };
};

export default useColors;
