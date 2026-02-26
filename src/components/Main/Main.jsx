// src/components/Main/Main.jsx
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { carouselConfig } from "./components/Carousel/carouselConfig.js";
import PropertyCard from "./components/PropertyCard/PropertyCard.jsx";

function Main() {
  return (
    <section className="properties-section">
      <div className="properties-header">
        <h2 className="properties-header__title">
          Descubre nuestras propiedades destacadas
        </h2>
        <a href="/propiedades" className="properties-header__link">
          Ver todas las propiedades →
        </a>
      </div>

      <div>
        <Carousel {...carouselConfig}>
          <PropertyCard
            image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            headline="Propiedad 1"
            description="Hermosa casa en el centro de la ciudad"
            propertykey="123333"
            bedrooms="2"
            bathrooms="1"
            area="90"
            type="venta" // Agregar esta propiedad
            price="1,510,000" // Y el precio
          />
          <PropertyCard
            image="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            headline="Propiedad 2"
            description="Apartamento moderno con vista al mar"
            propertykey="1311111"
            bedrooms="2"
            bathrooms="1"
            area="100"
            type="renta" // Agregar esta propiedad
            price="1,530,000" // Y el precio
          />
          <PropertyCard
            image="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            headline="Propiedad 3"
            description="Casa familiar con jardín"
            propertykey="14111111"
            bedrooms="2"
            bathrooms="2"
            area="125"
            type="renta" // Agregar esta propiedad
            price="1,540,000" // Y el precio
          />
          <PropertyCard
            image="https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            headline="Propiedad 4"
            description="Loft moderno en el centro"
            propertykey="152222"
            bedrooms="2"
            bathrooms="2"
            area="120"
            type="renta" // Agregar esta propiedad
            price="1,560,000" // Y el precio
          />
        </Carousel>
      </div>
    </section>
  );
}

export default Main;
