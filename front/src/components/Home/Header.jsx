import calculator from "../img/calculator.webp";
import "../styles/header.css";
import ellipse from "../img/ellipse.webp";

export default function Header() {
  return (
    <section className="header">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img uno" />
      <div className="left">
        <h1>Gana Dinero Usando El Matched Betting</h1>
        <h4>¡Aprende a ganar hasta 500€ mensuales sin riesgo desde casa!</h4>
        <a href="#funcion">Descúbrelo</a>
      </div>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img tres" />
      <img src={calculator} alt="imagen de relleno para fondo SmartBet" className="header-img" />
    </section>
  );
}
