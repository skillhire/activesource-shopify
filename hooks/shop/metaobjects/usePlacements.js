import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const usePlacement = () => {
  const [placement, setPlacement] = useState();

  const {
    getReference,
    getReferences,
    getValue,
    getImage,
    metaobject,
    fetchMetaobject,
    loading,
    error,
  } = useMetaobject();

  const fetchPlacement = async (handle) => {
    await fetchMetaobject(handle, "placement", 1);
  };

  useEffect(() => {
    if (metaobject) {
      setPlacement({
        uid: getValue(metaobject, "uid"),
        title: getValue(metaobject, "product_type"),
        code: getValue(metaobject, "code"),
        dimensions: getValue(metaobject, "dimensions"),
        location: getValue(metaobject, "location"),
        y_offset: getValue(metaobject, "y_offset"),
        x_offset: getValue(metaobject, "x_offset"),
        width: getValue(metaobject, "width"),
        height: getValue(metaobject, "height"),
        image: getImage(metaobject, "image"),
        print_width: getValue(metaobject, "print_width"),
        print_height: getValue(metaobject, "print_height"),
      });
    }
  }, [metaobject]);

  return {
    loading,
    error,
    placement,
    fetchPlacement,
  };
};

export default usePlacement;
