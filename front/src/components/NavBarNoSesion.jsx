import "./styles/navbar.css";
import { useState } from "react";
import logoInvisible from "./img/logo-invisible.webp";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function NavBarNoSesion() {
  const [menuResponsive, setMenuResponsive] = useState(false);
  const [linkBack, setLinkBack] = useState(false);

  // activa y desactiva el menu de responsive
  const handleButtonResponsive = () => {
    setMenuResponsive(!menuResponsive);
    setLinkBack(false);
  };
  // pone en false y deshabilita el menu de responsive
  const handleButtonHome = () => {
    setMenuResponsive(false);
    setLinkBack(true);
  };

  // al darle a entrar cambie los links para volver a home

  return (
    <div className="navbar">
      <button onClick={handleButtonResponsive} className="btn-responsive">
        <i className="fa-solid fa-bars"></i>
      </button>
      {linkBack ? (
        <Link className="link" to="/" onClick={() => setLinkBack(false)}>
          <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
        </Link>
      ) : (
        <ScrollLink className="link" to="home" smooth={true} duration={500}>
          <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
        </ScrollLink>
      )}
      <div className={`lista-btn ${menuResponsive ? "active" : ""}`}>
        <ul className="lista-navbar">
          <li>
            {linkBack ? (
              <Link className="link" to="/" onClick={() => setLinkBack(false)}>
                Cómo funciona
              </Link>
            ) : (
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
            )}
          </li>
          <li>
            {linkBack ? (
              <Link className="link" to="/" onClick={() => setLinkBack(false)}>
                FAQ
              </Link>
            ) : (
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
            )}
          </li>
          <li>
            {linkBack ? (
              <Link className="link" to="/" onClick={() => setLinkBack(false)}>
                Planes
              </Link>
            ) : (
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
            )}
          </li>
          <li>
            {linkBack ? (
              <Link className="link" to="/" onClick={() => setLinkBack(false)}>
                Contacto
              </Link>
            ) : (
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
            )}
          </li>
        </ul>

        <Link className="btn-entrar" to="/login" onClick={handleButtonHome}>
          Entrar
        </Link>
      </div>
    </div>
  );
}
