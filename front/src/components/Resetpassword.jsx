import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/login-register.css";
import ellipse from "./img/ellipse.webp";
import { useNavigate } from "react-router-dom";
const ResetPassword = ({ URL }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Variable de estado para controlar el estado de carga

  const navigate = useNavigate();
  useEffect(() => {
    // Establece un temporizador para limpiar los mensajes después de 3 segundos
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);
  // revisa si hay o no token en la para cambiar de contraseña en local storage y si hay lo elimina de la base de datos

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tokenPass = localStorage.getItem("tokenPass");
    try {
      const response = await axios.put(`${URL}/resetpassword/${tokenPass}`, { password, confirmPassword, tokenPass });
      if (response.status === 203) {
        return setErrorMessage(response.data.message);
      } else if (response.status === 200) {
        localStorage.removeItem("tokenPass");
        setIsLoading(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return setSuccessMessage(response.data.message);
      }
      setSuccessMessage(response.data.message);
      // Eliminar el token del localStorage después de restablecer la contraseña
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error al restablecer la contraseña");
    }
  };

  return (
    <div className="container-form">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <form onSubmit={handleSubmit} className="form-login-register">
        {isLoading && (
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <h1>Restablecer Contraseña</h1>
        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-lock icon-input"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Nueva Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <i className="fa-solid fa-lock icon-input"></i>
            <input
              type="password"
              className="form-control"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="btn-form mt-2">
          Restablecer Contraseña
        </button>
      </form>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
};

export default ResetPassword;
