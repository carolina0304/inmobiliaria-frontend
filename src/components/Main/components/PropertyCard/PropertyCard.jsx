import imageRec from "../../../../Images/recamara.jpg";

function PropertyCard({
  property,
  isAdmin,
  onDelete,
  onEdit,
  image,
  headline,
  onImageClick,
  description,
  propertyKey,
  bedrooms,
  bathrooms,
  area,
  type,
  price,
}) {
  return (
    <div className="property-card">
      <div className="property-card__image-wrapper">
        <span className="property-card__badge">{type}</span>

        <img
          src={image}
          alt={headline}
          className="property-card__image"
          onClick={() => onImageClick && onImageClick(image)}
        />
      </div>

      <div className="property-card__content">
        <h3 className="property-card__headline">{headline}</h3>

        <p className="property-card__description">📍 {description}</p>

        <p className="property-card__key">🔑 Clave: {propertyKey}</p>

        <div className="property-card__feature">🛏️ {bedrooms} habitaciones</div>

        <div className="property-card__feature">🚽 {bathrooms} baños</div>

        <div className="property-card__feature">📐 {area} m²</div>

        <p className="property-card__price">${price}</p>

        {isAdmin && (
          <div className="admin-controls">
            <button
              onClick={() => {
                console.log(
                  "Botón editar clickeado para propiedad:",
                  property?.id,
                );
                onEdit && onEdit(property?.id);
              }}
            >
              ✏️
            </button>
            <button
              onClick={() => {
                console.log(
                  "Botón eliminar clickeado para propiedad:",
                  property?.id,
                );
                onDelete && onDelete(property?.id);
              }}
            >
              ❌
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default PropertyCard;
