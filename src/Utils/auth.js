// src/utils/auth.js
const BASE_URL = "https://699f956c3188b0b1d5365c02.mockapi.io/api/v1/"; // Cambia por tu URL de API

// Usuarios simulados para desarrollo
const MOCK_USERS = [
  {
    email: "terraqro26@gmail.com",
    password: "admin123",
    name: "Admin",
    isAdmin: true,
  },
];
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simular delay de red
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        resolve({
          token: `fake-jwt-token-${Date.now()}`,
          user: {
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          },
        });
      } else {
        reject(new Error("Credenciales incorrectas"));
      }
    }, 500);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  });
};
