import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EstilosHerramientas/Oddsmatcher.css";
import ellipse from "../img/ellipse.webp";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import FiltroOddsmatcher from "./FiltroOddsmatcher";

export default function OddsmatcherGratis({ URL }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 30;
  const [filters, setFilters] = useState({
    deporteSeleccionado: [],
    casasSeleccionadas: [],
    mercadosSeleccionados: [],
    partidosSeleccionados: [],
    competicionesSeleccionadas: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/oddsmatcherGratis`);
        const datos = response.data.datos;
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
    setFilters({
      deporteSeleccionado: [],
      casasSeleccionadas: [],
      mercadosSeleccionados: [],
      partidosSeleccionados: [],
      competicionesSeleccionadas: [],
    });
  };

  const handleChangeFilter = (filterName, selectedOptions) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: selectedOptions.includes("SeleccionarTodo") ? [] : selectedOptions,
    }));
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
          <div className="filters">
            <div className="container-filtres m-4">
              <FiltroOddsmatcher
                label="Deportes"
                options={[...new Set(data.map((dato) => dato.deporte))]}
                selectedOptions={filters.deporteSeleccionado}
                onChange={(selectedOptions) => handleChangeFilter("deporteSeleccionado", selectedOptions)}
              />
              <FiltroOddsmatcher
                label="Casas de apuestas"
                options={[...new Set(data.map((dato) => dato.casa))]}
                selectedOptions={filters.casasSeleccionadas}
                onChange={(selectedOptions) => handleChangeFilter("casasSeleccionadas", selectedOptions)}
              />
              <FiltroOddsmatcher
                label="Competiciones"
                options={[...new Set(data.map((dato) => dato.competicion))]}
                selectedOptions={filters.competicionesSeleccionadas}
                onChange={(selectedOptions) => handleChangeFilter("competicionesSeleccionadas", selectedOptions)}
              />
              <FiltroOddsmatcher
                label="Partidos"
                options={[...new Set(data.map((dato) => dato.partido))]}
                selectedOptions={filters.partidosSeleccionados}
                onChange={(selectedOptions) => handleChangeFilter("partidosSeleccionados", selectedOptions)}
              />
              <FiltroOddsmatcher
                label="Mercados"
                options={[...new Set(data.map((dato) => dato.apuesta))]}
                selectedOptions={filters.mercadosSeleccionados}
                onChange={(selectedOptions) => handleChangeFilter("mercadosSeleccionados", selectedOptions)}
              />
            </div>
          </div>
          <div className="clear-filters">
            <button onClick={handleClearFilters}>Limpiar Filtros</button>
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>{`${currentPage} de ${totalPages}`}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
          <div className="lista-datos">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>deporte</th>
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
                {/* Filtrar y renderizar datos */}
                {data
                  .filter((dato) =>
                    filters.deporteSeleccionado.length === 0 ? true : filters.deporteSeleccionado.includes(dato.deporte)
                  )
                  .filter((dato) =>
                    filters.casasSeleccionadas.length === 0 ? true : filters.casasSeleccionadas.includes(dato.casa)
                  )
                  .filter((dato) =>
                    filters.competicionesSeleccionadas.length === 0
                      ? true
                      : filters.competicionesSeleccionadas.includes(dato.competicion)
                  )
                  .filter((dato) =>
                    filters.mercadosSeleccionados.length === 0 ? true : filters.mercadosSeleccionados.includes(dato.apuesta)
                  )
                  .filter((dato) =>
                    filters.partidosSeleccionados.length === 0 ? true : filters.partidosSeleccionados.includes(dato.partido)
                  )
                  .slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage)
                  .map((dato, index) => (
                    <tr key={dato.id} className="container-dato">
                      <td>{dato.fecha}</td>
                      <td>{dato.deporte}</td>
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
