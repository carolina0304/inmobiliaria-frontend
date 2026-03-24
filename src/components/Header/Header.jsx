import logo from "../../Images/LogoTerra.jpeg";
import logolinea from "../../Images/Line.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, userEmail, userRole, onLogout, onShowLogin }) => {
  const location = useLocation();

  return (
    <div>
      <header className="header">
        <img className="header__logo" src={logo} alt="Logotipo TerraQro" />
        <nav className="header__navigation">
          {/* Siempre visibles para el público */}
          <Link to="/" className="header__linkProp">
            Propiedades
          </Link>
          <Link to="/contacto" className="header__linkCont">
            Contacto
          </Link>

          {/* Solo para administradores */}
          {!isLoggedIn && (
            <button
              onClick={onShowLogin}
              className="header__linkProp header__admin-btn"
            >
              Iniciar Sesion
            </button>
          )}

          {/* Mostrar info del usuario logueado */}
          {isLoggedIn && (
            <div className="header__user-info">
              <span className="header__user-email">👤 {userEmail}</span>

              {/* 🔥 MOSTRAR BADGE DE ADMIN */}
              {userRole === "admin" && (
                <span className="header__admin-badge">ADMIN</span>
              )}
              <button onClick={onLogout} className="header__logout-btn">
                Cerrar Sesión
              </button>
              <span></span>
            </div>
          )}
        </nav>
      </header>
      <img className="header__line" src={logolinea} alt="Linea" />
    </div>
  );
};

export default Header;
