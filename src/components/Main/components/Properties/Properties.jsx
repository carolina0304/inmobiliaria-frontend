import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";
import { getProperties } from "../../../../Utils/api.js";

function Properties({ onImageClick }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [operationType, setOperationType] = useState("venta");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [searchMode, setSearchMode] = useState("search");
  const [propertyKeySearch, setPropertyKeySearch] = useState("");

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

  /*const allProperties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 1",
      description: "Hermosa casa en el centro de la ciudad",
      propertykey: "123333",
      bedrooms: "2",
      bathrooms: "1",
      area: "90",
      type: "venta",
      price: "1,510,000",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 2",
      description: "Apartamento moderno con vista al mar",
      propertykey: "1311111",
      bedrooms: "2",
      bathrooms: "1",
      area: "100",
      type: "renta",
      price: "1,530,000",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 3",
      description: "Casa familiar con jardín",
      propertykey: "14111111",
      bedrooms: "2",
      bathrooms: "2",
      area: "125",
      type: "renta",
      price: "1,540,000",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      headline: "Propiedad 4",
      description: "Loft moderno en el centro",
      propertykey: "152222",
      bedrooms: "2",
      bathrooms: "2",
      area: "120",
      type: "renta",
      price: "1,560,000",
    },
  ];*/

  const filteredProperties = allProperties.filter((property) => {
    // Si estamos en modo CLAVE
    if (searchMode === "key") {
      return property.propertykey
        .toLowerCase()
        .includes(propertyKeySearch.toLowerCase());
    }

    // Si estamos en modo BUSQUEDA normal
    const matchesOperation = property.type === operationType;

    const matchesLocation = property.description
      .toLowerCase()
      .includes(location.toLowerCase());

    const matchesSearch = property.headline
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesOperation && matchesLocation && matchesSearch;
  });

  // Mostrar loading
  if (isLoading) {
    return (
      <div className="properties__page">
        <div className="properties__loading">
          <p>Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="properties__page">
        <div className="properties__error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="properties__page">
      <div className="properties__container">
        <aside className="properties__filters">
          <div className="properties__search">
            <button
              className={`properties__search-btn ${
                searchMode === "search" ? "active" : ""
              }`}
              onClick={() => {
                setSearchMode("search");
                setSearchTerm("");
                setLocation("");
              }}
            >
              🔍 Búsqueda
            </button>
            <button
              className={`properties__key-btn ${
                searchMode === "key" ? "active" : ""
              }`}
              onClick={() => {
                setSearchMode("key");
                setSearchTerm("");
                setLocation("");
              }}
            >
              🔑 Clave
            </button>
          </div>

          {searchMode === "search" ? (
            <div className="properties__filter-group">
              <h4>🔎 Buscar propiedad</h4>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          ) : (
            <div className="properties__filter-group">
              <h4>🔑 Búsqueda por Clave</h4>
              <input
                type="text"
                placeholder="Ej: 123333"
                value={propertyKeySearch}
                onChange={(e) => setPropertyKeySearch(e.target.value)}
              />
            </div>
          )}

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
                <button
                  className={`properties__view-btn ${
                    viewMode === "grid" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  ⊞
                </button>
                <button
                  className={`properties__view-btn ${
                    viewMode === "list" ? "active" : ""
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  ⊡
                </button>
              </div>
            </div>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "properties__grid"
                : "properties__grid properties__list"
            }
          >
            {filteredProperties.map((property) => (
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
          </div>
        </main>
      </div>
    </div>
  );
}

export default Properties;
