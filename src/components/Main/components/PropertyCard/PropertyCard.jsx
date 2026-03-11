import imageRec from "../../../../Images/recamara.jpg";

function PropertyCard({
  property,
  isAdmin,
  onDelete,
  onEdit,
  onToggleFeatured,
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
  isFeatured = false,
}) {
  return (
    <div className="property-card">
      <div className="property-card__image-wrapper">
        <span className="property-card__badge">{type}</span>

        {/* Corazón para destacar (solo admin) */}
        {isAdmin && (
          <button
            className={`property-card__heart ${isFeatured ? "featured" : ""}`}
            onClick={() => onToggleFeatured && onToggleFeatured(property?.id)}
            title={
              isFeatured ? "Quitar de destacadas" : "Marcar como destacada"
            }
          >
            {isFeatured ? "❤️" : "🤍"}
          </button>
        )}

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
              onClick={() => onEdit && onEdit(property?.id)}
              title="Editar propiedad"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete && onDelete(property?.id)}
              title="Eliminar propiedad"
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
