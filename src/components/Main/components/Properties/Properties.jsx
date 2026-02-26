import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";

function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationType, setOperationType] = useState("all");
  const [location, setLocation] = useState("");

  // Datos de ejemplo - después los puedes mover a un archivo separado
  const allProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df",
      headline: "Casa Nueva con 4 Recs en Zizana",
      description: "Hermosa casa en el centro de la ciudad",
      bedrooms: "4",
      bathrooms: "3",
      area: "156",
      type: "venta",
      price: "3,250,000",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      headline: "Departamento en 3er piso",
      description: "Apartamento moderno con vista al mar",
      bedrooms: "2",
      bathrooms: "1",
      area: "47",
      type: "venta",
      price: "1,530,000",
    },
    // Agregar más propiedades aquí...
  ];

  return (
    <div className="properties-page">
      <div className="properties-container">
        {/* Panel de filtros */}
        <aside className="filters-panel">{/* Aquí irán los filtros */}</aside>

        {/* Área principal */}
        <main className="properties-main">
          {/* Header con contador y controles */}
          <div className="properties-header">
            <h2 className="results-count">
              {allProperties.length} Inmuebles Encontrados
            </h2>
            <div className="view-controls">{/* Controles de vista */}</div>
          </div>

          {/* Grid de propiedades */}
          <div className="properties-grid">
            {allProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={property.image}
                headline={property.headline}
                description={property.description}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                type={property.type}
                price={property.price}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Properties;
