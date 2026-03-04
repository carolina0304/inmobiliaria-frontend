// Función para obtener todas las propiedades
const getProperties = () => {
  return fetch(
    "https://699f956c3188b0b1d5365c02.mockapi.io/api/v1/properties",
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener las propiedades");
    }
    return response.json();
  });
};

// Exportar la función
export { getProperties };
