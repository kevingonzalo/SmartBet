import ellipse from "../img/ellipse.webp";
export default function Bonos() {
  return (
    <section className="container-herramientas">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <div className="content">
        <h1>Bonos</h1>
      </div>

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </section>
  );
}
