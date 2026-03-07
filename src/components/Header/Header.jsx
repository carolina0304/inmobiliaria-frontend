import logo from "../../Images/LogoTerra.jpeg";
import logolinea from "../../Images/Line.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, userEmail, onLogout }) => {
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
            <Link to="/login" className="header__linkProp">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </header>
      <img className="header__line" src={logolinea} alt="Linea" />
    </div>
  );
};

export default Header;
