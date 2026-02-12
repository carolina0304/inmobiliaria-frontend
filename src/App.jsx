import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

/*import "./App.css";*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
                <Carousel
                  additionalTransfrom={0}
                  arrows
                  autoPlaySpeed={3000}
                  centerMode={false}
                  className=""
                  containerClass="container-with-dots"
                  dotListClass=""
                  draggable
                  focusOnSelect={false}
                  infinite
                  itemClass=""
                  keyBoardControl
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside={false}
                  renderDotsOutside={false}
                  responsive={{
                    desktop: {
                      breakpoint: {
                        max: 3000,
                        min: 1024,
                      },
                      items: 3,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: {
                        max: 464,
                        min: 0,
                      },
                      items: 1,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: {
                        max: 1024,
                        min: 464,
                      },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                  }}
                  rewind={false}
                  rewindWithAnimation={false}
                  rtl={false}
                  shouldResetAutoplay
                  showDots={false}
                  sliderClass=""
                  slidesToSlide={1}
                  swipeable
                >
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
            }
          />

          <Route path="/contacto" element={<div>Pagina de contacto</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
