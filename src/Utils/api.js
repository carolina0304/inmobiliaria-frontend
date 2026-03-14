// URL base de la API
const API_URL = "https://699f956c3188b0b1d5365c02.mockapi.io/api/v1";

// Función para obtener todas las propiedades
const getProperties = () => {
  return fetch(`${API_URL}/properties`).then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener las propiedades");
    }
    return response.json();
  });
};

// Actualizar una propiedad
export const updateProperty = async (propertyId, updatedProperty) => {
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProperty),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la propiedad");
  }

  return response.json();
};

// Eliminar una propiedad
export const deleteProperty = async (propertyId) => {
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la propiedad");
  }

  return response.json();
};

// Crear una nueva propiedad
export const createProperty = async (newProperty) => {
  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProperty),
  });

  if (!response.ok) {
    throw new Error("Error al crear la propiedad");
  }

  return response.json();
};

// ========== FUNCIONES PARA USUARIOS ==========

// Obtener todos los usuarios
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }
  return response.json();
};

// Obtener usuario por email
export const getUserByEmail = async (email) => {
  const response = await fetch(`${API_URL}/users?email=${email}`);
  if (!response.ok) {
    throw new Error("Error al obtener usuario");
  }
  const users = await response.json();
  return users[0]; // Devuelve el primer usuario que coincida
};

// Actualizar favoritos del usuario
export const updateUserFavorites = async (userId, favorites) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorites }),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar favoritos");
  }
  return response.json();
};

// Exportar la función
export { getProperties };
