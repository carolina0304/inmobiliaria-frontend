// src/components/Main/Main.jsx
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselConfig } from "./components/Carousel/carouselConfig.js";
import PropertyCard from "./components/PropertyCard/PropertyCard.jsx";
import { getProperties } from "../../Utils/api.js";

function Main({ onImageClick }) {
  // Nuevos estados para la API
  const [allProperties, setAllProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para cargar datos de la API
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setIsLoading(true);
        const properties = await getProperties();
        setAllProperties(properties);
        setError(null);
      } catch (err) {
        setError("Error al cargar las propiedades");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, []);

  // Agregar antes del return principal
  if (isLoading) {
    return (
      <section className="properties-section">
        <div>Cargando propiedades...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="properties-section">
        <div>Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="properties-section">
      <div className="properties-header">
        <h2 className="properties-header__title">
          Descubre nuestras propiedades destacadas
        </h2>
        <a href="/propiedades" className="properties-header__link">
          Ver todas las propiedades →
        </a>
      </div>

      <div>
        <Carousel {...carouselConfig}>
          {allProperties.map((property) => (
            <PropertyCard
              key={property.id}
              image={property.image}
              headline={property.headline}
              onImageClick={onImageClick}
              description={property.description}
              propertykey={property.propertykey}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              type={property.type}
              price={property.price}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Main;
