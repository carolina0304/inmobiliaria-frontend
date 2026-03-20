function PropertyCard({
  property,
  userRole = null,
  user = null, // información del usuario
  /*isAdmin,*/
  onDelete,
  onEdit,
  onToggleFeatured,
  onToggleFavorite, //  función para manejar favoritos
  onImageClick,
  /* image,
  headline,
  onImageClick,
  description,
  propertyKey,
  bedrooms,
  bathrooms,
  area,
  type,
  price,
  isFeatured = false,*/
}) {
  // 🔥 VERIFICAR SI ES ADMIN
  const isAdmin = userRole === "admin";

  const isLoggedIn = user !== null; //verificar si está logueado

  // 🔥 DEBUGGING - Agrega estos console.log temporalmente
  console.log("🔍 PropertyCard Debug:");
  console.log("userRole:", userRole);
  console.log("user:", user);
  console.log("isAdmin:", isAdmin);
  console.log("isLoggedIn:", isLoggedIn);

  // verificar si la propiedad está en favoritos del usuario
  const isFavorite = user?.favorites?.includes(property.id) || false;

  const handleEditProperty = (propertyId) => {
    const property = allProperties.find((prop) => prop.id === propertyId);
    setEditingProperty(property);

    setFormData({
      headline: property.headline,
      description: property.description,
      propertyKey: property.propertyKey,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      type: property.type,
      price: property.price,
      image: property.image,
      isFeatured: property.isFeatured,
    });

    setShowAddModal(true);
  };

  return (
    <div className="property-card">
      <div className="property-card__image-wrapper">
        <span className="property-card__badge">{property.type}</span>

        {/* Corazón para admin (destacar) O para usuarios (favoritos) */}
        {(isAdmin || isLoggedIn) && (
          <button
            className={`property-card__heart ${
              isAdmin
                ? property.isFeatured
                  ? "featured"
                  : ""
                : isFavorite
                  ? "favorite"
                  : ""
            }`}
            onClick={() => {
              if (isAdmin) {
                onToggleFeatured && onToggleFeatured(property.id);
              } else {
                onToggleFavorite && onToggleFavorite(property.id);
              }
            }}
            title={
              isAdmin
                ? property.isFeatured
                  ? "Quitar de destacadas"
                  : "Marcar como destacada"
                : isFavorite
                  ? "Quitar de favoritos"
                  : "Agregar a favoritos"
            }
          >
            <svg viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}

        <img
          src={property.image}
          alt={property.headline}
          className="property-card__image"
          onClick={() => onImageClick && onImageClick(property.image)}
        />
      </div>

      <div className="property-card__content">
        <h3 className="property-card__headline">{property.headline}</h3>

        <p className="property-card__description">📍 {property.description}</p>

        <p className="property-card__key">🔑 Clave: {property.propertyKey}</p>

        <div className="property-card__feature">
          🛏️ {property.bedrooms} habitaciones
        </div>

        <div className="property-card__feature">
          🚽 {property.bathrooms} baños
        </div>

        <div className="property-card__feature">📐 {property.area} m²</div>

        <p className="property-card__price">${property.price}</p>

        {isAdmin && (
          <div className="admin-controls">
            <button
              onClick={() => onEdit && onEdit(property.id)}
              title="Editar propiedad"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete && onDelete(property.id)}
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
