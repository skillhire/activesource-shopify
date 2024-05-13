import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const useStorefronts = () => {
  const [storefront, setStorefront] = useState();

  const {
    getReference,
    getValue,
    getImage,
    metaobject,
    fetchMetaobject,
    loading,
    error,
  } = useMetaobject();

  const fetchStorefront = async (handle) => {
    await fetchMetaobject(handle, "storefront", 1);
  };

  useEffect(() => {
    if (metaobject) {
      setStorefront({
        name: getValue(metaobject, "name"),
        title: getValue(metaobject, "title"),
        description: getValue(metaobject, "description"),
        direction: getValue(metaobject, "direction"),
        logo: getImage(metaobject, "logo"),
        image: getImage(metaobject, "image"),
        collection: getReference(metaobject, "collection"),
      });
    }
  }, [metaobject]);

  return {
    loading,
    error,
    storefront,
    fetchStorefront,
  };
};

export default useStorefronts;
