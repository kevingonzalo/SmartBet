import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OddsmatcherGratis.css";
import ellipse from "../img/ellipse.webp";

export default function OddsmatcherGratis({ URL }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para controlar el estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/oddsmatcherGratis`);
        setData(response.data);
        setIsLoading(false); // Cambiar el estado de carga a falso una vez que se ha cargado la data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
        <div className="content">
          <h1>OddsmatcherGratis</h1>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      )}

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
