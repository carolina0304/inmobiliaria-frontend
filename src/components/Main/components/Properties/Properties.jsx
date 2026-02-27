import React, { useState } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";

function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationType, setOperationType] = useState("venta");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const allProperties = [
    {
      image:
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 1",
      description: "Hermosa casa en el centro de la ciudad",
      bedrooms: "2",
      bathrooms: "1",
      area: "90",
      type: "venta",
      price: "1,510,000",
    },
    {
      image:
        "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 2",
      description: "Apartamento moderno con vista al mar",
      bedrooms: "2",
      bathrooms: "1",
      area: "100",
      type: "renta",
      price: "1,530,000",
    },
    {
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 3",
      description: "Casa familiar con jardín",
      bedrooms: "2",
      bathrooms: "2",
      area: "125",
      type: "renta",
      price: "1,540,000",
    },
    {
      image:
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 4",
      description: "Loft moderno en el centro",
      bedrooms: "2",
      bathrooms: "2",
      area: "120",
      type: "renta",
      price: "1,560,000",
    },
  ];

  const filteredProperties = allProperties.filter((property) => {
    const matchesOperation = property.type === operationType;

    const matchesLocation = property.description
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesSearch = property.headline
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesOperation && matchesLocation && matchesSearch;
  });

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
                <input
                  type="radio"
                  name="operation"
                  value="venta"
                  checked={operationType === "venta"}
                  onChange={(e) => setOperationType(e.target.value)}
                />
                Venta
              </label>
              <label>
                <input
                  type="radio"
                  name="operation"
                  value="renta"
                  checked={operationType === "renta"}
                  onChange={(e) => setOperationType(e.target.value)}
                />
                Renta
              </label>
            </div>

            <div className="properties__filter-group">
              <h4>📍 Ubicación</h4>
              <input
                type="text"
                placeholder="Buscar ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </aside>

        <main className="properties__main">
          <div className="properties__header">
            <h2 className="properties__results-count">
              {filteredProperties.length} Inmuebles Encontrados
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
            {filteredProperties.map((property) => (
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
