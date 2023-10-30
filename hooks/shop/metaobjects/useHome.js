import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const useHome = () => {
  const [home, setHome] = useState();
  const [featuredCollection, setFeaturedCollection] = useState();
  const [testimonials, setTestimonials] = useState();

  const {
    getReferences,
    getReference,
    getValue,
    getImage,
    metaobject,
    fetchMetaobject,
    loading,
    error,
  } = useMetaobject();

  const fetchHome = async () => {
    await fetchMetaobject("home", "home", 1);
  };

  useEffect(() => {
    if (metaobject) {
      setHome({
        title: getValue(metaobject, "title"),
        subtitle: getValue(metaobject, "subtitle"),
      });
      setFeaturedCollection(getReference(metaobject, "featured_collection"));
    }
  }, [metaobject]);

  useEffect(() => {
    fetchMetaobject("home", "home", 1);
  }, []);

  return {
    loading,
    error,
    home,
    featuredCollection,
    testimonials,
    fetchHome,
  };
};

export default useHome;
