import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

/*import "./App.css";*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { carouselConfig } from "./components/Main/components/Carousel/carouselConfig.js";
import "../src/blocks/carousel.css";
import "../src/blocks/properties.css";

import PropertyCard from "./components/Main/components/PropertyCard/PropertyCard.jsx";

function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Sección de encabezado - FUERA del Carousel */}
                <section className="properties-section">
                  <div className="properties-header">
                    <h2 className="properties-header__title">
                      Descubre nuestras propiedades destacadas
                    </h2>
                    <a
                      href="/todas-propiedades"
                      className="properties-header__link"
                    >
                      Ver todas las propiedades →
                    </a>
                  </div>

                  {/* Carousel - DENTRO del mismo contenedor */}
                  <div>
                    <Carousel {...carouselConfig}>
                      <PropertyCard
                        image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                        headline="Propiedad 1"
                        description="Hermosa casa en el centro de la ciudad"
                      />
                      <PropertyCard
                        image="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        headline="Propiedad 2"
                        description="Apartamento moderno con vista al mar"
                      />
                      <PropertyCard
                        image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        headline="Propiedad 3"
                        description="Casa familiar con jardín"
                      />
                      <PropertyCard
                        image="https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        headline="Propiedad 4"
                        description="Loft moderno en el centro"
                      />
                    </Carousel>
                  </div>
                </section>
              </div>
            }
          />

          <Route path="/contacto" element={<div>Pagina de contacto</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
