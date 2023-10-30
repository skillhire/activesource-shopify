import React, { useState, useEffect } from "react";
import useMetaobject from "../useMetaobjects";

const usePage = () => {
  const [page, setPage] = useState();
  const [title, setTitle] = useState();

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

  const fetchPage = async (handle) => {
    await fetchMetaobject(handle, "page", 1);
  };

  useEffect(() => {
    if (metaobject) {
      setPage({
        title: getValue(metaobject, "title"),
        subtitle: getValue(metaobject, "subtitle"),
        image: getImage(metaobject, "image"),
        text: getValue(metaobject, "text"),
      });
    }
  }, [metaobject]);

  return {
    loading,
    error,
    page,
    fetchPage,
  };
};

export default usePage;
