import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard.jsx";
import {
  getProperties,
  updateProperty,
  deleteProperty,
  updateUserFavorites,
  createProperty,
} from "../../../../Utils/api.js";

function Properties({
  onImageClick,
  userRole,
  userEmail,
  userId,
  userFavorites,
  isLoggedIn,
  onUpdateFavorites,
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

  // Estados para el formulario
  const [formData, setFormData] = useState({
    headline: "",
    description: "",
    propertyKey: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    type: "venta",
    price: "",
    image: "",
    isFeatured: false,
  });

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

  // NUEVAS FUNCIONES DE ADMIN
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

  //  FUNCIÓN PARA MANEJAR FAVORITOS
  const handleToggleFavorite = async (propertyId) => {
    console.log("🔥 CLICK EN FAVORITO - Iniciando...");
    console.log("🔥 propertyId recibido:", propertyId);
    console.log("🔥 userId actual:", userId);
    console.log("🔥 userFavorites actuales:", userFavorites);
    if (!userId) {
      console.log("❌ No hay userId - mostrando alerta");
      alert("Debes estar logueado para agregar favoritos");
      return;
    }

    try {
      console.log("Toggle favorito para propiedad:", propertyId);

      let newFavorites;
      // Si ya está en favoritos, lo quitamos
      if (userFavorites.includes(propertyId.toString())) {
        console.log("➖ Quitando de favoritos");
        newFavorites = userFavorites.filter(
          (id) => id !== propertyId.toString(),
        );
      } else {
        console.log("➕ Agregando a favoritos");
        // Si no está, lo agregamos
        newFavorites = [...userFavorites, propertyId.toString()];
      }

      console.log("🔄 Nuevos favoritos:", newFavorites);

      // Actualizar en la API
      await onUpdateFavorites(propertyId);
      console.log("✅ API actualizada exitosamente");

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

  // Función para manejar cambios en el formulario
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setFormData({
      headline: "",
      description: "",
      propertyKey: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      type: "venta",
      price: "",
      image: "",
      isFeatured: false,
    });
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí llamaremos a createProperty con los datos del formulario
      const newProperty = await createProperty(formData);

      // Actualizar la lista de propiedades
      setAllProperties((prev) => [...prev, newProperty]);

      // Resetear el formulario
      resetForm();

      // Cerrar el modal/formulario
      setShowAddModal(false);

      console.log("Propiedad creada exitosamente:", newProperty);
    } catch (error) {
      console.error("Error al crear la propiedad:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const filteredProperties = allProperties.filter((property) => {
    // Si estamos en modo CLAVE
    if (searchMode === "key") {
      // VERIFICAR QUE propertyKey EXISTE Y ES STRING
      return (
        property.propertyKey &&
        typeof property.propertyKey === "string" &&
        property.propertyKey
          .toLowerCase()
          .includes(propertyKeySearch.toLowerCase())
      );
    }
    //  Verificar que type sea string antes de usar toLowerCase
    const matchesOperation =
      property.type && typeof property.type === "string"
        ? property.type.toLowerCase() === operationType.toLowerCase()
        : false;

    // VERIFICAR QUE description EXISTE
    const matchesLocation =
      property.description && typeof property.description === "string"
        ? property.description.toLowerCase().includes(location.toLowerCase())
        : false;

    // VERIFICAR QUE headline EXISTE
    const matchesSearch =
      property.headline && typeof property.headline === "string"
        ? property.headline.toLowerCase().includes(searchTerm.toLowerCase())
        : false;

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
              <button className="admin-btn" onClick={handleAddProperty}>
                + Agregar Propiedad
              </button>
              {/*<button className="admin-btn">Gestionar Propiedades</button>*/}
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

            {/* 🔥 MODAL PARA AGREGAR/EDITAR PROPIEDADES */}
            {showAddModal && (
              <div
                className="modal-overlay"
                onClick={() => setShowAddModal(false)}
              >
                <div
                  className="modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3>
                    {editingProperty
                      ? "Editar Propiedad"
                      : "Agregar Nueva Propiedad"}
                  </h3>
                  <button
                    className="modal-close"
                    onClick={() => setShowAddModal(false)}
                  >
                    ✕
                  </button>
                  {/* Aquí irá tu formulario para agregar/editar propiedades */}
                  <form onSubmit={handleFormSubmit} className="property-form">
                    <div className="form-group">
                      <label>Título:</label>
                      <input
                        type="text"
                        name="headline"
                        value={formData.headline}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Descripción:</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Clave de Propiedad:</label>
                      <input
                        type="text"
                        name="propertyKey"
                        value={formData.propertyKey}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Habitaciones:</label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleFormChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Baños:</label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Área (m²):</label>
                      <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Tipo:</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                      >
                        <option value="venta">Venta</option>
                        <option value="renta">Renta</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Precio:</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>URL de Imagen:</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleFormChange}
                        />
                        Propiedad Destacada
                      </label>
                    </div>

                    <div className="form-buttons">
                      <button type="submit" className="btn-primary">
                        {editingProperty ? "Actualizar" : "Crear"} Propiedad
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowAddModal(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Properties;
