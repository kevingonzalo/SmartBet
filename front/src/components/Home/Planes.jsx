import "../styles/planes.css";
import flechaarriba from "../img/flecha-arriba.svg";
import sombrero from "../img/sombrero.svg";
import engranaje from "../img/engranaje.svg";
import comunidad from "../img/comunidad.svg";
import Plan from "./Plan";
import ellipse from "../img/ellipse.webp";
export default function Planes() {
  return (
    <section id="Planes" className="planes">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-planes-uno" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-planes-dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-planes-tres" />
      <h1>Empieza Ahora Mismo</h1>
      <p className="planes-parrafo">
        Si eres nuevo comienza con la prueba gratuita ya que hasta que no pasen 30 dias desde el registro en las casas
        no tendrás acceso a las promociones
      </p>
      <ul className="lista-planes">
        <Plan
          titulo="Prueba Gratis"
          precio="0€"
          gana="Gana 35€"
          flechaarriba={flechaarriba}
          flechaarribaText="Gana 35€"
          sombrero={sombrero}
          sombreroText="Guías básicas"
          engranaje={engranaje}
          engranajeText="Herramientas limitadas"
          comunidad={comunidad}
          comunidadText="Acceso a la Comunidad"
          textButton="Regístrate Gratis"
        />
        <Plan
          titulo="Premium Mensual"
          precio="15€"
          gana="Gana 35€"
          flechaarriba={flechaarriba}
          flechaarribaText="Gana hasta 500€ al mes"
          sombrero={sombrero}
          sombreroText="Todas las Guías"
          engranaje={engranaje}
          engranajeText="Todas las Herramientas"
          comunidad={comunidad}
          comunidadText="Comunidad Premium"
          textButton="Comprar Plan"
        />
        <Plan
          titulo="Premium anual"
          precio="10€"
          gana="Gana 35€"
          flechaarriba={flechaarriba}
          flechaarribaText="Gana hasta 500€ al mes"
          sombrero={sombrero}
          sombreroText="Todas las Guías"
          engranaje={engranaje}
          engranajeText="Todas las Herramientas"
          comunidad={comunidad}
          comunidadText="Comunidad Premium"
          textButton="Comprar Plan"
        />
      </ul>
    </section>
  );
}
