import { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import * as auth from "../src/Utils/auth.js"; // Tu archivo auth.js
import Login from "../src/components/Main/components/Login/login.jsx"; // Tu componente Login

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
import "../src/blocks/login.css";

/*import PropertyCard from "./components/Main/components/PropertyCard/PropertyCard.jsx";*/

import Footer from "./components/Footer/Footer.jsx";

function App() {
  const [selectImage, setSelectImage] = useState(null);

  // 🔐 NUEVOS ESTADOS PARA AUTENTICACIÓN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [userRole, setUserRole] = useState(null); // 'admin' o 'user'

  const ADMIN_EMAILS = ["terraqro26@gmail.com"]; // Tus emails admin

  // 🔐 FUNCIÓN PARA MANEJAR LOGIN
  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          // Verificar si es admin por email
          const isAdmin = ADMIN_EMAILS.includes(email.toLowerCase());
          setUserRole(isAdmin ? "admin" : "user");
        }
      })
      .catch((err) => {
        console.error("Error en login:", err);
      });
  };

  // 🔐 FUNCIÓN PARA MANEJAR LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  // 🔐 VERIFICAR TOKEN AL CARGAR LA APP
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.error("Token inválido:", err);
          localStorage.removeItem("jwt");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Mostrar loading mientras verifica el token
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Main onImageClick={setSelectImage} />} />
          <Route
            path="/propiedades"
            element={<Properties onImageClick={setSelectImage} />}
          />
          <Route path="/contacto" element={<Contact />} />
          {/* 🔐 RUTA DE LOGIN */}
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        <Footer />
        <ImageBig image={selectImage} onClose={() => setSelectImage(null)} />
      </div>
    </Router>
  );
}

export default App;
