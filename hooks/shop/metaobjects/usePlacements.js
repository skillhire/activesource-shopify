import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const usePlacements = () => {
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
    await fetchMetaobject(handle, "placement");
  };
  
  const fetchAllPlacements = async () => {
    await fetchMetaobjects("placement");
  };

  const getPlacement = (metaobject) => {
    return {
      id: getValue(metaobject, "uid"),
      code: getValue(metaobject, "code"),
      title: getValue(metaobject, "title"),
      dimensions: getValue(metaobject, "dimensions"),
      location: getValue(metaobject, "location"),
      previewSrc: getImage(metaobject, "image"),
      productType: getValue(metaobject, "product_type"),
      warehouse: getValue(metaobject, "warehouse"),
      isEnterprise: getValue(metaobject, "is_enterprise"),
      top: `${getValue(metaobject, "x_offset")}%`,
      left: `${getValue(metaobject, "y_offset")}%`,
      height: `${getValue(metaobject, "height")}%`,
      width: `${getValue(metaobject, "width")}%`,
      widthInches: Number(getValue(metaobject, "print_width")),
      heightInches: Number(getValue(metaobject, "print_height")),
    };
  }

  const filterPlacements = (placements, productType, warehouse) => {
    const filteredPlacements = placements
      .filter((p) => productType === p.productType)
      .filter((p) => {
        if (warehouse && p.warehouse) {
          return p.warehouse === warehouse;
        }
        // Change to false to prevent placements without warehouse to be included
        return true;
      } );
    const front = filteredPlacements.filter((p) => p.location === "front");
    const back = filteredPlacements.filter((p) => p.location === "back");
    return { front, back };
  }

  useEffect(() => {
    if (metaobject) {
      setPlacement(getPlacement(metaobject));
    }
  }, [metaobject]);

  useEffect(() => {
    if (metaobjects) {
      setActivePlacements(metaobjects.map((p) => getPlacement(p)));
    }
  }, [metaobjects]);

  return {
    loading,
    error,
    placement,
    filterPlacements,
    activePlacements,
    fetchPlacement,
    fetchAllPlacements,
  };
};

export default usePlacements;
