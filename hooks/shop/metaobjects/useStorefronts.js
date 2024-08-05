import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const useStorefronts = () => {
  const [storefront, setStorefront] = useState();
  const [photos, setPhotos] = useState([]);
  
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

  const fetchStorefront = async (handle) => {
    await fetchMetaobject(handle, "storefront", 1);
  };

  useEffect(() => {
    if (metaobject) {
      console.log("METAOBJECT", metaobject);
      setStorefront({
        handle: metaobject?.handle,
        name: getValue(metaobject, "name"),
        title: getValue(metaobject, "title"),
        description: getValue(metaobject, "description"),
        direction: getValue(metaobject, "direction"),
        logo: getImage(metaobject, "logo"),
        image: getImage(metaobject, "image"),
        image2: getImage(metaobject, "image_2"),
        collection: getReference(metaobject, "collection"),
        collections: getReferences(metaobject, "collections"),
        imagesUrl: getValue(metaobject, "images_url"),
        primaryColor: getValue(metaobject, "primary_color"),
        disableFeatures: getValue(metaobject, "disable_features") == "true",
        disableHowItWorks: getValue(metaobject, "disable_how_it_works") == "true",
        disablePhotos: getValue(metaobject, "disable_photos") == "true",
      });

      let _photos = getReferences(metaobject, "photos");
      setPhotos(_photos.map((photo) => {
        return {
          image: getImage(photo, "image"),
          product: getReference(photo, "product"),
          url: getReference(photo, "url"),
        };
      }))       
    }
  }, [metaobject]);

  return {
    loading,
    error,
    photos,  
    storefront,
    fetchStorefront,
  };
};

export default useStorefronts;
