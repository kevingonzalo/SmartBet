import ellipse from "../img/ellipse.webp";
import calculadora from "../img/img-herramientas-usuario/calculadora.png";
import ODDSMATCHERgratuito from "../img/img-herramientas-usuario/ODDSMATCHER-gratuito.png";
import ODDSMATCHERpremium from "../img/img-herramientas-usuario/ODDSMATCHER-premium.png";
import Box from "./Box";
export default function Herramientas() {
  return (
    <section className="container-herramientas">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <div className="content">
        <h1>Herramientas</h1>
        <div className="container-box">
          <Box
            img={calculadora}
            titulo="Calculadora Matched Betting"
            alt="logo calculadora de herramientas Smartbet"
            link="/calculadora"
          />
          <Box
            img={ODDSMATCHERgratuito}
            titulo="Oddsmatcher Gratuito"
            alt="logo Oddsmatcher gratuito de herramientas Smartbet"
            link="/Oddsmatcher-gratuito"
          />
          <Box
            img={ODDSMATCHERpremium}
            titulo="Oddsmatcher Premium"
            alt="logo Oddsmatcher Premium de herramientas Smartbet"
            link="/Oddsmatcher-premium"
          />
        </div>
      </div>

      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </section>
  );
}
