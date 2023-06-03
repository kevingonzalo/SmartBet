import mobile from "../img/mobile.webp";
import currencydollar from "../img/currency-dollar.svg";
import shieldcheck from "../img/shield-check.svg";
import table from "../img/table.svg";
import trophy from "../img/trophy.webp";
import ellipse from "../img/ellipse.webp";
import "../styles/funcion.css";
export default function Funcion() {
  return (
    <section id="funcion">
      <main className="funcion">
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-uno" />
        <img src={mobile} alt="movil imagen de muestra de como funciona smartbet" className="funcion-img" />
        <div className="right">
          <h1>¿Qué es el Matched Betting?</h1>
          <br />
          <p>
            Las Apuestas Cruzadas o Matched Betting son una forma de aprovechar las promociones de las casas de apuestas
            para ganar dinero online.
          </p>
          <p>Se basan en fórmulas matemáticas sin depender de la suerte, eliminando así cualquier tipo de riesgo.</p>
        </div>
      </main>
      <main className="logos-funcion">
        <div className="logo">
          <img src={shieldcheck} alt="logo de muestra SmartBet" />
          <h3>Seguro</h3>
          <p>Nunca pierdes dinero</p>
        </div>
        <div className="logo">
          <img src={currencydollar} alt="logo de muestra SmartBet" />
          <h3>Ganancias</h3>
          <p>Hasta 500€ mensuales</p>
        </div>
        <div className="logo">
          <img src={table} alt="logo de muestra SmartBet" />
          <h3>Sin azar</h3>
          <p>Operaciones matemáticas</p>
        </div>
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-dos" />
      </main>
      <main className="funcion">
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-uno" />
        <div className="right uno-trofe">
          <h1>SmartBet Te Ofrece Todo Lo Necesario</h1>
          <br />
          <p>
            Tendrás acceso a una sección con todos los bonos diarios con guías para aprender a sacarle la mayor
            rentabilidad y convertirte en un maestro.
          </p>
          <p>
            Además, estarán a tu alcance todas las herramientas para poder hacer Matched Betting de forma segura y
            ganando la máxima cantidad posible.
          </p>
        </div>
        <img src={trophy} className="funcion-img" alt="trofeo imagen de muestra de como funciona smartbet" />
      </main>
    </section>
  );
}
