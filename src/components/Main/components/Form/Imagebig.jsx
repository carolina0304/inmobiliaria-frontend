import React from "react";
import "../../../../blocks/imagebig.css";

function ImageBig({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="Imagebig" onClick={onClose}>
      <div className="Imagebig__content" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Vista Grande" />
      </div>
    </div>
  );
}

export default ImageBig;
