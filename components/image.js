import React, { useState, useEffect, useRef } from "react";
import classname from "classnames";

function Image({ id, index, src, className, containerClass }) {
  const [loading, setLoading] = useState(true);
  const updateFunc = () => setLoading(false);

  return (
    <div
      className={classname({
        "absolute overflow-hidden bg-gray-400 transition-transform transform-center h-0": loading,
        "image-container rounded-sm cursor-pointer": true,
        "skeleton-box": id === "cover-image" || !id,
        "image-loaded pb-0": !loading,
        "via-image": src,
        [containerClass]: true,
      })}
    >
      <img
        alt=""
        src={src}
        style={{ display: loading ? "none" : "initial" }}
        onLoad={() => updateFunc()}
        className={className}
        ref={(input) => {
          if (!input) return;
          const img = input;
          img.onload = () => updateFunc();
        }}
      />
    </div>
  );
}

export default Image;
