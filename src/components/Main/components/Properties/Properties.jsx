import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";

function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationType, setOperationType] = useState("venta");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const allProperties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df",
      headline: "Casa Nueva con 4 Recs en Zizana",
      description: "Hermosa casa en el centro de la ciudad",
      propertykey: "123333",
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
      propertykey: "1233355",
      bedrooms: "2",
      bathrooms: "1",
      area: "47",
      type: "venta",
      price: "1,530,000",
    },
  ];

  return (
    <div className="properties__page">
      <div className="properties__container">
        <aside className="properties__filters">
          <div className="properties__search">
            <button className="properties__search-btn">🔍 Búsqueda</button>
            <button className="properties__key-btn">🔑 Clave</button>
          </div>

          <div className="properties__filters-section">
            <h3>🔽 Filtros</h3>

            <div className="properties__filter-group">
              <h4>🏷️ Operación</h4>
              <label>
                <input type="radio" name="operation" value="venta" checked />
                Venta
              </label>
              <label>
                <input type="radio" name="operation" value="renta" />
                Renta
              </label>
            </div>

            <div className="properties__filter-group">
              <h4>📍 Ubicación</h4>
              <input type="text" placeholder="Buscar ubicación" />
            </div>
          </div>
        </aside>

        <main className="properties__main">
          <div className="properties__header">
            <h2 className="properties__results-count">
              {allProperties.length} Inmuebles Encontrados
            </h2>
            <div className="properties__view-controls">
              <span>Ordenar por</span>
              <select>
                <option>Más recientes</option>
              </select>
              <div className="properties__view-buttons">
                <button className="properties__view-btn">⊞</button>
                <button className="properties__view-btn active">⊡</button>
              </div>
            </div>
          </div>

          <div className="properties__grid">
            {allProperties.map((property) => (
              <PropertyCard
                key={property.id}
                image={property.image}
                headline={property.headline}
                description={property.description}
                propertykey={property.propertykey}
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
