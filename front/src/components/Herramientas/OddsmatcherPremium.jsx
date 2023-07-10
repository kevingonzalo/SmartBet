import { useEffect, useState } from "react";
import axios from "axios";
import "./EstilosHerramientas/Oddsmatcher.css";
import ellipse from "../img/ellipse.webp";
import { Link } from "react-router-dom";

export default function OddsmatcherPremium({ URL }) {
  const [data, setData] = useState([]);
  const [premium, setPremium] = useState(true);
  const [change, setChange] = useState(false);

  // Variable de estado para controlar el estado de carga
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/OddsmatcherPremium`);
        setData(response.data);
        setIsLoading(false); // Cambiar el estado de carga a falso una vez que se ha cargado la data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [change]);
  const handleAdelanteClick = async () => {
    try {
      await axios.post(`${URL}/PasarPagina`);
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-herramientas">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />

      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="spinner-text">Cargando Contenido...</p>
        </div>
      ) : (
        <>
          {premium ? (
            <div className="content">
              <h1>OddsmatcherPremium</h1>
              <button>atras</button>
              <button onClick={handleAdelanteClick}>adelante</button>
              <div dangerouslySetInnerHTML={{ __html: data }} />
            </div>
          ) : (
            <div className="content">
              <h1>No tienes el Premium</h1>
              <Link className="btn-form" to="/Premium">
                Obtener Premium
              </Link>
            </div>
          )}
        </>
      )}

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
