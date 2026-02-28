import React from "react";
import "../../../../blocks/imagebig.css";

function ImageBig({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="Imagebig" onclick={onClose}>
      <div className="Imagebig__content">
        <img src={image} alt="Vista Grande" />
      </div>
    </div>
  );
}

export default ImageBig;
