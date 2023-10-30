import React, { useState, useEffect } from "react";
import SegmentContext from "context/SegmentContext";
import { AnalyticsBrowser } from "@segment/analytics-next";
import PropTypes from "prop-types";

export const SegmentProvider = ({ children, writeKey }) => {
  const [segment, setSegment] = useState();

  useEffect(() => {
    if (writeKey) {
      setSegment(AnalyticsBrowser.load({ writeKey }));
    }
  }, [writeKey]);

  let value = {
    segment,
  };

  return (
    <SegmentContext.Provider value={value}>{children}</SegmentContext.Provider>
  );
};

SegmentProvider.propTypes = {
  children: PropTypes.any.isRequired,
  writeKey: PropTypes.string,
};

export default SegmentProvider;
