import { Link } from "react-router-dom";
import logoInvisible from "./img/logo-invisible.webp";
import { useState } from "react";
import axios from "axios";
export default function NavBarSesion({ URL }) {
  const [menuResponsive, setMenuResponsive] = useState(false);

  // activa y desactiva el menu de responsive
  const handleButtonResponsive = () => {
    setMenuResponsive(!menuResponsive);
  };

  // pone en false y deshabilita el menu de responsive
  const handleButtonHome = () => {
    setMenuResponsive(false);
  };
  const handleLogout = async () => {
    try {
      // consigo el token de localStorage y lo meto en una variable para enviarlo al back
      const tokenLogin = localStorage.getItem("tokenlogin");

      // envia el token a eliminar a la base de datos
      await axios.delete(`${URL}/logout`, { data: tokenLogin });

      // elimina el token de inicio de sesion del localstorage
      localStorage.removeItem("tokenlogin");

      // redirige a la pagina de inicio
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar">
      <button onClick={handleButtonResponsive} className="btn-responsive">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="img-navbar">
        <Link className="link" to="/">
          <img src={logoInvisible} onClick={handleButtonHome} alt="Logo de Pagina Oficial de SmartBet" />
        </Link>
      </div>
      <div className={`lista-btn ${menuResponsive ? "active" : ""}`}>
        <ul className="lista-navbar">
          <li>
            <Link to="/guias" className="link" onClick={handleButtonResponsive}>
              guías
            </Link>
          </li>
          <li>
            <Link to="/bonos" className="link" onClick={handleButtonResponsive}>
              Bonos
            </Link>
          </li>
          <li>
            <Link to="/herramientas" className="link" onClick={handleButtonResponsive}>
              Herramientas
            </Link>
          </li>
          <li>
            <Link to="/Premium" className="link" onClick={handleButtonResponsive}>
              Premium
            </Link>
          </li>
          <li>
            <Link to="/perfil" className="link" onClick={handleButtonResponsive}>
              Mi perfil
            </Link>
          </li>
        </ul>

        <button className="btn-entrar" onClick={handleLogout}>
          Salir
        </button>
      </div>
    </div>
  );
}
