import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

/*import "./App.css";*/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx"; // Separa tu página principal
import Properties from "./components/Main/components/Properties/Properties.jsx"; // Nueva página
import Contact from "./components/Main/components/Form/Contact.jsx";
import ImageBig from "./components/Main/components/Form/Imagebig.jsx";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { carouselConfig } from "./components/Main/components/Carousel/carouselConfig.js";
import "../src/blocks/carousel.css";
import "../src/blocks/properties.css";

/*import PropertyCard from "./components/Main/components/PropertyCard/PropertyCard.jsx";*/

import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [selectImage, setSelectImage] = useState(null);

  return (
    <Router>
      <div className="page">
        <Header />
        <Routes>
          <Route path="/" element={<Main onImageClick={setSelectImage} />} />
          <Route
            path="/propiedades"
            element={<Properties onImageClick={setSelectImage} />}
          />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Footer />
        <ImageBig image={selectImage} onClose={() => setSelectImage(null)} />
      </div>
    </Router>
  );
}

export default App;
