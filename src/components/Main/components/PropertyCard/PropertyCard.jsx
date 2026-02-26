import imageRec from "../../../../Images/recamara.jpg";

function PropertyCard({
  image,
  headline,
  description,
  propertykey,
  bedrooms,
  bathrooms,
  area,
}) {
  return (
    <>
      <div className="property-card">
        <img src={image} alt={headline} className="property-card__image" />
        <div className="property-card__content">
          <h3 className="property-card__headline">{headline}</h3>
          <p className="property-card__description">{description}</p>
          <p className="property-card__key">{propertykey}</p>
          <div className="property-card__feature">
            <span className="property-card__icon">🛏️</span>
            <span className="property-card__text">{bedrooms}</span>
          </div>
          <div className="property-card__feature">
            <span className="property-card__icon">🚿</span>
            <span className="property-card__text">{bathrooms}</span>
          </div>
          <div className="property-card__feature">
            <span className="property-card__icon">📐</span>
            <span className="property-card__text">{area} m²</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
