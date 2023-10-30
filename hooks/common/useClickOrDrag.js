import React, { useState } from "react";

// Determine if the user is swiping or clicking,
// and prevent images from being dragged in carousels
const useClickOrDrag = ({ onClick, onDrag }) => {
  const DELTA_PIXELS = 6;
  const [posX, setPosX] = useState(0);

  const onMouseUp = (e) => {
    if (e.clientX < posX + DELTA_PIXELS && e.clientX > posX - DELTA_PIXELS) {
      onClick ? onClick() : null;
    } else {
      onDrag ? onDrag() : null;
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    setPosX(e.clientX);
  };

  return {
    onMouseDown,
    onMouseUp,
  };
};

export default useClickOrDrag;
