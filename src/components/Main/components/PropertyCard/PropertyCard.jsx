import imageRec from "../../../../Images/recamara.jpg";

function PropertyCard({ image, headline, description }) {
  return (
    <>
      <div className="property-card">
        <img src={image} alt={headline} className="property-card__image" />
        <div className="property-card__content">
          <h3 className="property-card__headline">{headline}</h3>
          <p className="property-card__description">{description}</p>
          <img
            src={imageRec}
            alt="Recamara"
            className="property-card__character"
          />
        </div>
      </div>
    </>
  );
}

export default PropertyCard;
