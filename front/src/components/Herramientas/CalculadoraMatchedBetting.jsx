import { useState, useEffect } from "react";
import ellipse from "../img/ellipse.webp";
import "./EstilosHerramientas/Calculadora.css";
import axios from "axios";
export default function CalculadoraMatchedBetting({ URL }) {
  const [backOdds, setBackOdds] = useState("");
  const [layOdds, setLayOdds] = useState("");
  const [backStake, setBackStake] = useState("");
  const [layCommission, setLayCommission] = useState("");
  const [backProfit, setBackProfit] = useState(0);
  const [layLiability, setLayLiability] = useState(0);
  const [layProfit, setLayProfit] = useState(0);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/oddsmatcherGratis`);
        setData(response.data);
        console.log(data);
        setIsLoading(false); // Cambiar el estado de carga a falso una vez que se ha cargado la data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const calculate = () => {
    const backProfitValue = backStake * backOdds - backStake;
    const layLiabilityValue = (backStake * layOdds) / (layOdds - 1);
    const layProfitValue = layLiabilityValue - layLiabilityValue * layCommission;

    setBackProfit(backProfitValue);
    setLayLiability(layLiabilityValue);
    setLayProfit(layProfitValue);
  };

  return (
    <div className="container-herramientas calculadora">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="spinner-text">Cargando Contenido...</p>
        </div>
      ) : (
        <div className="calculadora">
          <h2>Matched Betting Calculator</h2>
          <div>
            <label>Back Odds:</label>
            <input type="text" value={backOdds} onChange={(e) => setBackOdds(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Lay Odds:</label>
            <input type="text" value={layOdds} onChange={(e) => setLayOdds(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Back Stake:</label>
            <input type="text" value={backStake} onChange={(e) => setBackStake(parseFloat(e.target.value))} />
          </div>
          <div>
            <label>Lay Commission:</label>
            <input type="text" value={layCommission} onChange={(e) => setLayCommission(parseFloat(e.target.value))} />
          </div>
          <button onClick={calculate}>Calculate</button>
          <div>
            <h3>Results:</h3>
            <p>Back Profit: {backProfit}</p>
            <p>Lay Liability: {layLiability}</p>
            <p>Lay Profit: {layProfit}</p>
          </div>
        </div>
      )}
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
