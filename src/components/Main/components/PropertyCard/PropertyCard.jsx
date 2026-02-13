function PropertyCard({ image, headline, description }) {
  return (
    <>
      <div className="property-card">
        <img src={image} alt={headline} className="property-card__image" />
        <div className="property-card__content">
          <h3 className="property-card__headline">{headline}</h3>
          <p className="property-card__description">{description}</p>
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
