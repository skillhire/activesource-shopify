import React, { useState, useEffect } from "react";

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return {
    scrollY,
  };
};

export default useScrollY;
