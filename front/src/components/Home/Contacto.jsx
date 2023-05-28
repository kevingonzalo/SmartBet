import "../styles/contacto.css";
import bombilla from "../img/bombilla.webp";
import ellipse from "../img/ellipse.webp";
import instagram from "../img/instagram.webp";
import telegram from "../img/telegram.webp";
import youtube from "../img/youtube.webp";
export default function Contacto() {
  return (
    <section id="Contacto" className="contacto">
      <div className="left-contacto">
        <img src={bombilla} className="img-bombilla" alt="imagen de muestra SmarthBet seccion contacto" />
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-uno-contact" />
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-dos-contact" />
      </div>
      <div className="right-contacto">
        <h1>¿Tienes Dudas?</h1>
        <h3 className="mail m-movil">
          Escríbenos en <a href="mailto:smartbetayuda@gmail.com">smartbetayuda@gmail.com</a>
        </h3>
        <h3 className="mail m-pc">
          Escríbenos en{" "}
          <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrjnKXrlscdDXnsZwHhGbvllSQchtrnqtwFCHXSRHKHvVLsFvfrrvwkBRSVvwxwFCZJjpg">
            smartbetayuda@gmail.com
          </a>
        </h3>
        <h1 className="text-redes">Síguenos en nuestras redes</h1>
        <div className="img-right-contacto">
          <a href="/">
            <img src={instagram} alt="logo instagram seccion contacto SmartBet" />
          </a>
          <a href="/">
            <img src={telegram} alt="logo telegram seccion contacto SmartBet" />
          </a>
          <a href="/">
            <img src={youtube} alt="logo youtube seccion contacto SmartBet" />
          </a>
        </div>
      </div>
    </section>
  );
}
