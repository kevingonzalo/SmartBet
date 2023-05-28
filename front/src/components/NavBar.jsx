import "./styles/navbar.css";
import { useState } from "react";
import logoInvisible from "./img/logo-invisible.webp";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function NavBar() {
  const [menuResponsive, setMenuResponsive] = useState(false);

  const handleButtonResponsive = () => {
    setMenuResponsive(!menuResponsive);
  };

  const handleButtonHome = () => {
    setMenuResponsive(false);
  };

  return (
    <div className="navbar">
      <button onClick={handleButtonResponsive} className="btn-responsive">
        <i className="fa-solid fa-bars"></i>
      </button>
      <ScrollLink className="link" to="home" smooth={true} duration={500}>
        <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
      </ScrollLink>
      <div className={`lista-btn ${menuResponsive ? "active" : ""}`}>
        <ul className="lista-navbar">
          <li>
            <ScrollLink
              to="funcion"
              offset={-50}
              className="link"
              smooth={true}
              duration={500}
              onClick={handleButtonResponsive}
            >
              Cómo funciona
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="faq"
              offset={-50}
              className="link"
              smooth={true}
              duration={500}
              onClick={handleButtonResponsive}
            >
              FAQ
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="Planes"
              offset={-100}
              className="link"
              smooth={true}
              duration={500}
              onClick={handleButtonResponsive}
            >
              Planes
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="Contacto"
              offset={-100}
              className="link"
              smooth={true}
              duration={500}
              onClick={handleButtonResponsive}
            >
              Contacto
            </ScrollLink>
          </li>
        </ul>

        <Link className="btn-entrar" to="/login" onClick={handleButtonHome}>
          Entrar
        </Link>
      </div>
    </div>
  );
}
