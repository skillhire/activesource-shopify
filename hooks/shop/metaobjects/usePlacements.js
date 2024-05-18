import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const usePlacement = () => {
  const [placement, setPlacement] = useState();
  const [activePlacements, setActivePlacements] = useState([]);

  const {
    getReference,
    getReferences,
    getValue,
    getImage,
    metaobject,
    metaobjects,
    fetchMetaobject,
    fetchMetaobjects,
    loading,
    error,
  } = useMetaobject();

  const fetchPlacement = async (handle) => {
    await fetchMetaobject(handle, "placement", 1);
  };
  
  const fetchAllPlacements = async (product_type, warehouse) => {
    await fetchMetaobjects("placement", {
      product_type,
    });
  };


  const getPlacement = (metaobject) => {
    return {
      id: getValue(metaobject, "uid"),
      code: getValue(metaobject, "code"),
      title: getValue(metaobject, "title"),
      dimensions: getValue(metaobject, "dimensions"),
      location: getValue(metaobject, "location"),
      previewSrc: getImage(metaobject, "image"),
      top: `${getValue(metaobject, "x_offset")}%`,
      left: `${getValue(metaobject, "y_offset")}%`,
      height: `${getValue(metaobject, "height")}%`,
      width: `${getValue(metaobject, "width")}%`,
      widthInches: Number(getValue(metaobject, "print_width")),
      heightInches: Number(getValue(metaobject, "print_height")),
    };
  }

  useEffect(() => {
    if (metaobject) {
      setPlacement(getPlacement(metaobject));
    }
  }, [metaobject]);

  useEffect(() => {
    if (metaobjects) {
      console.log("metaobjects", metaobjects);
      const placements = metaobjects.map((p) => getPlacement(p));
      const front = placements.filter((p) => p.location === "front");
      const back = placements.filter((p) => p.location === "back");
      setActivePlacements({ front, back });
    }
  }, [metaobjects]);

  return {
    loading,
    error,
    placement,
    activePlacements,
    fetchPlacement,
    fetchAllPlacements,
  };
};

export default usePlacement;
