import img1 from "../img/img-herramientas-usuario/img1.png";
import img2 from "../img/img-herramientas-usuario/img2.png";
import img3 from "../img/img-herramientas-usuario/img3.png";
import img4 from "../img/img-herramientas-usuario/img4.png";
import ellipse from "../img/ellipse.webp";
import "./EstilosHerramientas/Herramientas.css";
export default function Guias() {
  return (
    <section className="container-herramientas">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <div className="content">
        <h1>Aprende todo lo necesario</h1>
        <div className="guias">
          <div className="guia">
            <button>GUÍA 1</button>
            <img src={img1} alt="img de seccion guias de la Pagina web oficial de Smartbet" />
            <p>Introducción al matched betting?</p>
          </div>
          <div className="guia">
            <button>GUÍA 2</button>
            <img src={img2} alt="img de seccion guias de la Pagina web oficial de Smartbet" />
            <p>Registrarse en las casas de apuestas</p>
          </div>

          <div className="guia">
            <button>GUÍA 3</button>
            <img src={img3} alt="img de seccion guias de la Pagina web oficial de Smartbet" />
            <p>Casas de intercambio</p>
          </div>
          <div className="guia">
            <button>GUÍA 4</button>
            <img src={img4} alt="img de seccion guias de la Pagina web oficial de Smartbet" />
            <p>Cómo funciona el matched betting?</p>
          </div>
        </div>
      </div>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </section>
  );
}
