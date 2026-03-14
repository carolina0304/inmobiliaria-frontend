import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";
import {
  getProperties,
  updateProperty,
  deleteProperty,
  updateUserFavorites,
} from "../../../../Utils/api.js";

function Properties({
  onImageClick,
  userRole,
  userEmail,
  userId,
  userFavorites,
  isLoggedIn,
}) {
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

  // Estados para el modal de agregar/editar
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  /*const [userFavorites, setUserFavorites] = useState([]);*/

  // useEffect para cargar datos de la API
  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const properties = await getProperties();
      console.log("Datos de la API:", properties);
      console.log("Primer elemento:", properties[0]);
      setAllProperties(properties);
      setError(null);
    } catch (err) {
      setError("Error al cargar las propiedades");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 NUEVAS FUNCIONES DE ADMIN
  const handleDeleteProperty = async (propertyId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar esta propiedad?")
    ) {
      try {
        await deleteProperty(propertyId);
        setAllProperties((prev) =>
          prev.filter((prop) => prop.id !== propertyId),
        );
        alert("Propiedad eliminada exitosamente");
      } catch (error) {
        console.error("Error al eliminar:", error);
        alert("Error al eliminar la propiedad");
      }
    }
  };

  const handleEditProperty = (propertyId) => {
    const property = allProperties.find((prop) => prop.id === propertyId);
    setEditingProperty(property);
    setShowAddModal(true);
  };

  // 🔥  FUNCIÓN PARA MANEJAR FAVORITOS
  const handleToggleFavorite = async (propertyId) => {
    if (!userId) {
      alert("Debes estar logueado para agregar favoritos");
      return;
    }

    try {
      console.log("🔥 Toggle favorito para propiedad:", propertyId);

      let newFavorites;
      // Si ya está en favoritos, lo quitamos
      if (userFavorites.includes(propertyId.toString())) {
        newFavorites = userFavorites.filter(
          (id) => id !== propertyId.toString(),
        );
      } else {
        // Si no está, lo agregamos
        newFavorites = [...userFavorites, propertyId.toString()];
      }

      // Actualizar en la API
      await updateUserFavorites(userId, newFavorites);

      // Aquí necesitarías una función para actualizar el estado en App.jsx
      console.log("✅ Favoritos actualizados en API:", newFavorites);
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
      alert("Error al actualizar favoritos");
    }
  };

  const handleToggleFeatured = async (propertyId) => {
    try {
      const property = allProperties.find((prop) => prop.id === propertyId);
      const updatedProperty = {
        ...property,
        isFeatured: !property.isFeatured,
      };

      await updateProperty(propertyId, updatedProperty);

      setAllProperties((prev) =>
        prev.map((prop) =>
          prop.id === propertyId
            ? { ...prop, isFeatured: !prop.isFeatured }
            : prop,
        ),
      );
    } catch (error) {
      console.error("Error al actualizar destacada:", error);
      alert("Error al actualizar la propiedad");
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowAddModal(true);
  };
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
      return property.propertyKey
        .toLowerCase()
        .includes(propertyKeySearch.toLowerCase());
    }
    //  Verificar que type sea string antes de usar toLowerCase
    const matchesOperation =
      typeof property.type === "string"
        ? property.type.toLowerCase() === operationType.toLowerCase()
        : false; // Si no es string, no coincide

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

            {searchMode === "search" ? (
              <div className="properties__filter-group">
                <h4>🔎 Tipo de propiedad</h4>
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
          {/* 🔥 BOTONES SOLO PARA ADMIN */}
          {userRole === "admin" && (
            <div className="admin-controls">
              <button className="admin-btn">+ Agregar Propiedad</button>
              <button className="admin-btn">Gestionar Propiedades</button>
            </div>
          )}

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
                property={property}
                /*image={property.image}
                headline={property.headline}
                onImageClick={onImageClick}
                description={property.description}
                propertyKey={property.propertyKey}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.area}
                type={property.type}
                price={property.price}
                isAdmin={isAdmin}
                onDelete={() => handleDeleteProperty(property.id)}
                onEdit={() => handleEditProperty(property.id)}
                onToggleFeatured={() => handleToggleFeatured(property.id)}
                isFeatured={property.isFeatured}*/
                onImageClick={onImageClick}
                userRole={userRole}
                user={
                  isLoggedIn
                    ? { email: userEmail, favorites: userFavorites }
                    : null
                }
                onToggleFavorite={handleToggleFavorite}
                onDelete={() => handleDeleteProperty(property.id)}
                onEdit={() => handleEditProperty(property.id)}
                onToggleFeatured={() => handleToggleFeatured(property.id)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Properties;
