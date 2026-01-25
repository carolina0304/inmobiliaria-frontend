import logo from "../../Images/LogoTerra.jpeg";
import logolinea from "../../Images/Line.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="Logotipo TerraQro" />
        <nav className="header__navigation">
          <Link to="/" className="header__linkProp">
            Propiedades
          </Link>
          <Link to="/contacto" className="header__linkCont">
            Contacto
          </Link>
        </nav>
        <img className="header__line" src={logolinea} alt="Linea" />
      </div>
    </header>
  );
};

export default Header;
