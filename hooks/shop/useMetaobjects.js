import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  QUERY_METAOBJECT_BY_HANDLE,
  QUERY_METAOBJECTS,
} from "graphql/shopify/metaobjects";

const useMetaobjects = () => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const [metaobject, setMetaobject] = useState();
  const [metaobjects, setMetaobjects] = useState();

  const [fetchMetaobjectQuery, fetchMetaobjectResp] = useLazyQuery(
    QUERY_METAOBJECT_BY_HANDLE
  );

  const [fetchMetaobjectsQuery, fetchMetaobjectsResp] =
    useLazyQuery(QUERY_METAOBJECTS);

  const fetchMetaobject = async (handle, type, perPage = 250) => {
    const resp = await fetchMetaobjectQuery({
      variables: {
        handle: handle,
        type: type,
        first: perPage,
      },
    });
    return resp;
  };

  const fetchMetaobjects = (type, perPage = 250) => {
    let resp = fetchMetaobjectsQuery({
      variables: {
        first: perPage,
        type: type,
      },
    });
    return resp || [];
  };

  useEffect(() => {
    if (fetchMetaobjectResp?.data) {
      setMetaobject(fetchMetaobjectResp?.data?.metaobject);
    }
  }, [fetchMetaobjectResp?.data]);

  useEffect(() => {
    if (fetchMetaobjectsResp?.data) {
      setMetaobjects(
        fetchMetaobjectsResp?.data?.metaobjects?.edges.map((e) => e.node)
      );
    }
  }, [fetchMetaobjectsResp?.data]);

  // Helper methods to get a field from a metaobject
  const getField = (metaobject, key) => {
    return metaobject?.fields?.find((field) => field.key == key);
  };

  const getValue = (metaobject, key) => {
    let field = getField(metaobject, key);
    return field?.value;
  };

  const getImage = (metaobject, key) => {
    let field = getField(metaobject, key);
    return field?.reference?.image?.url;
  };

  const getReference = (metaobject, key) => {
    let field = getField(metaobject, key);
    return field?.reference;
  };

  const getReferences = (metaobject, key) => {
    let field = getField(metaobject, key);
    return field?.references?.edges.map((e) => e.node);
  };

  useEffect(() => {
    setError(fetchMetaobjectResp?.error || fetchMetaobjectsResp?.error);
  }, [fetchMetaobjectResp?.error, fetchMetaobjectsResp?.error]);

  useEffect(() => {
    setLoading(fetchMetaobjectResp?.loading || fetchMetaobjectsResp?.loading);
  }, [fetchMetaobjectResp?.loading, fetchMetaobjectsResp?.loading]);

  return {
    getField,
    getValue,
    getImage,
    getReference,
    getReferences,
    metaobject,
    metaobjects,
    fetchMetaobject,
    fetchMetaobjects,
    loading,
    error,
  };
};

export default useMetaobjects;
