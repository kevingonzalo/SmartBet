import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EstilosHerramientas/Oddsmatcher.css";
import ellipse from "../img/ellipse.webp";

export default function OddsmatcherPremium({ URL }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/OddsmatcherPremium`);
        const datos = response.data.datos;
        console.log(datos);
        setTotalPages(datos[0].totalPages);
        setIsLoading(false);
        setData(datos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === 1) {
        return 1;
      } else {
        return prevPage - 1;
      }
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === totalPages) {
        return totalPages;
      } else {
        return prevPage + 1;
      }
    });
  };

  const handleClearFilters = () => {
    console.log(3);
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
        <div className="content">
          <h1>OddsmatcherGratis</h1>
          <div className="filters">{/* Agregar los componentes de filtro aquí */}</div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>{`${currentPage} de ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
          <div className="clear-filters">
            <button onClick={handleClearFilters}>Limpiar Filtros</button>
          </div>
          <div className="lista-datos">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Partido</th>
                  <th>Competicion</th>
                  <th>Apuesta</th>
                  <th>Rating</th>
                  <th>Casa</th>
                  <th>Afavor</th>
                  <th>Contra</th>
                  <th>Liquidez</th>
                  <th>Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {data.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage).map((dato, index) => (
                  <tr key={dato.id} className="container-dato">
                    <td>{dato.fecha}</td>
                    <td>{dato.partido}</td>
                    <td>{dato.competicion}</td>
                    <td>{dato.apuesta}</td>
                    <td>{dato.rating}</td>
                    <td>{dato.casa}</td>
                    <td>{dato.afavor}</td>
                    <td>{dato.contra}</td>
                    <td>{dato.liquidez}</td>
                    <td>{dato.actualizado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
