import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/login-register.css";
import ellipse from "./img/ellipse.webp";
export default function Recuperarpass({ URL }) {
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Establece un temporizador para limpiar los mensajes después de 3 segundos
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenPass = localStorage.getItem("tokenPass");
    if (tokenPass !== null && tokenPass !== undefined) {
      return setErrorMessage("Ya se ha enviado un correo de recuperación anteriormente");
    } else {
      try {
        // Realizar la petición al servidor para solicitar recuperación de contraseña
        const response = await axios.post(`${URL}/recuperarPass`, { email });
        if (response.status === 203) {
          return setErrorMessage(response.data.error);
        }
        localStorage.setItem("tokenPass", response.data.tokenPass);
        setSuccessMessage(response.data.message);
      } catch (error) {
        console.log(error);
        setErrorMessage("Error al solicitar recuperación de contraseña");
      }
    }
  };

  return (
    <div className="container-form">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <form onSubmit={handleSubmit} className="form-login-register">
        <h1>Recuperar Contraseña</h1>
        <div className="input">
          <i className="fa-solid fa-envelope icon-input"></i>
          <input
            className="form-control"
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && (
          <p className="success-message">
            {`${successMessage}`}
            <br />
            Por favor Revise su correo incluyendo la sección "Spam"
          </p>
        )}{" "}
        <button type="submit" className="btn-form mt-2">
          Enviar
        </button>
      </form>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
