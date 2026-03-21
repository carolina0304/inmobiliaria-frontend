import React from "react";
import "../../../../blocks/imagebig.css";

function ImageBig({ property, onClose }) {
  if (!property) return null;

  return (
    <div className="Imagebig" onClick={onClose}>
      <div className="Imagebig__content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar */}
        <button className="Imagebig__close" onClick={onClose}>
          ✕
        </button>

        {/* Imagen */}
        <img src={property.image} alt={property.headline} />

        {/* Información de la propiedad */}
        <div className="Imagebig__info">
          <h3 className="Imagebig__title">{property.headline}</h3>
          <p className="Imagebig__location">📍 {property.description}</p>
          <p className="Imagebig__price">${property.price}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageBig;
