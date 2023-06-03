import calculator from "../img/calculator.webp";
import "../styles/header.css";
import ellipse from "../img/ellipse.webp";
import { Link as ScrollLink } from "react-scroll";

export default function Header() {
  return (
    <section className="header">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img fondo-uno" />
      <div className="left">
        <h1>Gana Dinero Usando El Matched Betting</h1>
        <h4>¡Aprende a ganar hasta 500€ mensuales sin riesgo desde casa!</h4>
        <ScrollLink className="left-button" to="funcion" offset={-50} smooth={true} duration={500}>
          Descúbrelo
        </ScrollLink>
      </div>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img fondo-dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img fondo-tres" />
      <img src={calculator} alt="imagen de relleno para fondo SmartBet" className="header-img" />
    </section>
  );
}
