import ellipse from "../img/ellipse.webp";
export default function Herramientas() {
  return (
    <section className="container-herramientas">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <div className="content">
        <h1>Herramientas</h1>
      </div>

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </section>
  );
}
