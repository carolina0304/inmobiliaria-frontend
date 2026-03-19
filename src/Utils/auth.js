// src/utils/auth.js
const BASE_URL = "https://699f956c3188b0b1d5365c02.mockapi.io/api/v1/"; // Cambia por tu URL de API

/* Usuarios simulados para desarrollo
const MOCK_USERS = [
  {
    email: "terraqro26@gmail.com",
    password: "admin123",
    name: "Admin",
    isAdmin: true,
  },
];*/

// 🔥 FUNCIÓN PRINCIPAL DE LOGIN (usando MockAPI)
export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const users = await response.json();

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      return {
        token: `fake-jwt-token-${Date.now()}-${user.id}`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          favorites: user.favorites || [],
        },
      };
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    throw new Error("Error de autenticación");
  }
};

// 🔥 FUNCIÓN PARA VERIFICAR TOKEN
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      // Extraer ID del usuario del token
      const tokenParts = token.split("-");
      const userId = tokenParts[tokenParts.length - 1];

      // Buscar usuario por ID en MockAPI
      fetch(`${BASE_URL}/users/${userId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Usuario no encontrado");
        })
        .then((user) => {
          resolve({
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            favorites: user.favorites || [],
          });
        })
        .catch(() => {
          reject(new Error("Token inválido"));
        });
    } catch (error) {
      reject(new Error("Token inválido"));
    }
  });
};

// 🔥 FUNCIÓN PARA ACTUALIZAR FAVORITOS DEL USUARIO
export const updateUserFavorites = async (userId, newFavorites) => {
  try {
    console.log("🔄 Actualizando favoritos en MockAPI para usuario:", userId);
    console.log("📝 Nuevos favoritos:", newFavorites);

    const response = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: newFavorites,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar favoritos en la API");
    }

    const updatedUser = await response.json();
    console.log("✅ Favoritos actualizados en MockAPI:", updatedUser.favorites);

    return updatedUser;
  } catch (error) {
    console.error("❌ Error al actualizar favoritos:", error);
    throw error;
  }
};
