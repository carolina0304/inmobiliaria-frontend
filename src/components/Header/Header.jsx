import logo from "../../Images/LogoTerra.png";

const Header = () => {
  return (
    <header className="header">
      <div>
        <img className="header__logo" src={logo} alt="Logotipo TerraQro" />
      </div>
    </header>
  );
};
