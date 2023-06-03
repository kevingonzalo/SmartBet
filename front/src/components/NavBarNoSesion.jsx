import "./styles/navbar.css";
import { useState } from "react";
import logoInvisible from "./img/logo-invisible.webp";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function NavBarNoSesion() {
  const [menuResponsive, setMenuResponsive] = useState(false);
  const [linkBack, setLinkBack] = useState(false);

  const handleOpenCloseMenu = () => {
    setMenuResponsive(!menuResponsive);
  };
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
  // pone en false y deshabilita el menu de responsive
  const handleButtonHomefalse = () => {
    setMenuResponsive(false);
    setLinkBack(false);
  };

  // al darle a entrar cambie los links para volver a home

  return (
    <div className="navbar">
      <button onClick={handleOpenCloseMenu} className="btn-responsive">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="img-navbar">
        {linkBack ? (
          <Link className="link" to="/" onClick={handleButtonHomefalse}>
            <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
          </Link>
        ) : (
          <ScrollLink className="link" to="home" smooth={true} duration={500}>
            <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
          </ScrollLink>
        )}
      </div>
      <div className={`lista-btn ${menuResponsive ? "active" : ""}`}>
        <ul className="lista-navbar">
          <li>
            {linkBack ? (
              <Link className="link" to="/" onClick={handleButtonHomefalse}>
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
              <Link className="link" to="/" onClick={handleButtonHomefalse}>
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
              <Link className="link" to="/" onClick={handleButtonHomefalse}>
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
              <Link className="link" to="/" onClick={handleButtonHomefalse}>
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
