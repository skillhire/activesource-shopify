import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const usePlacements = () => {
  const [placement, setPlacement] = useState();
  const [activePlacements, setActivePlacements] = useState([]);

  const {
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
        return false;
      } );
    const front = filteredPlacements.filter((p) => p.location === "front");
    const back = filteredPlacements.filter((p) => p.location === "back");
    return { front, back };
  }

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
        canvas_width: getValue(metaobject, "canvas_width"),
        canvas_height: getValue(metaobject, "canvas_height"),
      });
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
