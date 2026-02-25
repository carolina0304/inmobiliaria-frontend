import React, { useState } from "react";

function PropertiesPage({ properties }) {
  const [filter, setFilter] = useState("all"); // 'all', 'sale', 'rent'

  return (
    <section className="properties-page">
      <div className="properties-page__container">
        <h1 className="properties-page__title">Todas las Propiedades</h1>

        {/* Aquí irán los filtros */}
        <div className="properties-page__filters">
          {/* Botones de filtro */}
        </div>

        {/* Aquí irá la lista de propiedades */}
        <div className="properties-page__grid">
          {/* PropertyCard components */}
        </div>
      </div>
    </section>
  );
}

export default PropertiesPage;
