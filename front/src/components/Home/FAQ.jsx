import "../styles/FAQ.css";
import flecha from "../img/flecha.svg";
import { useState } from "react";
import ellipse from "../img/ellipse.webp";
export default function FAQ() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const handleQuestion = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  return (
    <section id="faq">
      <div className="container-faq">
        <img src={ellipse} alt="imagen de fondo SmartBet" className="img-verde-faq" />
        <h1>¿Sigue Sin Convencerte?</h1>
        <div className="preguntas-faq">
          <ul className="lista-preguntas-faq">
            <li onClick={() => handleQuestion(0)}>
              <div className="pregunta">
                <p>¿Es real o un fraude?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 0 ? "active" : "inactive"}`}>
              Es real. Es una forma de ganar dinero online que funciona y que está probada.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
            <li onClick={() => handleQuestion(1)}>
              <div className="pregunta">
                <p>¿Necesito dinero para empezar?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 1 ? "active" : "inactive"}`}>
              No, puedes empezar con 0€. Solo necesitas una cuenta en una casa de apuestas y una tarjeta de crédito o
              débito.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
            <li onClick={() => handleQuestion(2)}>
              <div className="pregunta">
                <p>¿Puedo perder dinero?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 2 ? "active" : "inactive"}`}>
              No, nunca pierdes dinero. Siempre ganas.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
            <li onClick={() => handleQuestion(3)}>
              <div className="pregunta">
                <p>¿Necesito entender de deportes o apuestas?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 3 ? "active" : "inactive"}`}>
              No, no es necesario. Solo necesitas seguir las instrucciones que te daremos.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
            <li onClick={() => handleQuestion(4)}>
              <div className="pregunta">
                <p>¿Puedo probarlo sin pagar?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 4 ? "active" : "inactive"}`}>
              Sí, puedes probarlo gratis durante 7 días. Después, si quieres seguir, tendrás que pagar una cuota mensual
              de 9,99€.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
            <li onClick={() => handleQuestion(5)}>
              <div className="pregunta">
                <p>¿Es legal hacer Matched Betting?</p>
              </div>
              <img src={flecha} alt="flecha para preguntas, imagen de SmartBet" />
            </li>
            <p className={`parrafo-pregunta ${activeQuestion === 5 ? "active" : "inactive"}`}>
              Sí, es legal. No hay ningún tipo de riesgo ni de ilegalidad. Solo necesitas seguir las instrucciones que
              te daremos.
            </p>
            <hr className="barra-separadora" />
            {/* // */}
          </ul>
        </div>
      </div>
    </section>
  );
}
