import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import iconPassword from "./img/iconPassword.svg";
import mostrarPass from "./img/mostrarPass.png";
import ocultarPass from "./img/ocultarPass.png";

import ellipse from "./img/ellipse.webp";
export default function Login({ URL, setUser, fetchUserProfile }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Variable de estado para el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Variable de estado para el mensaje de éxito
  const [isLoading, setIsLoading] = useState(false); // Variable de estado para controlar el estado de carga
  const [showPassword, setShowPassword] = useState(false); // si muestra la contraseña o no
  const navigate = useNavigate();
  useEffect(() => {
    // Establece un temporizador para limpiar los mensajes después de 3 segundos
    const timer = setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Objeto con los datos del formulario
    const formData = {
      email: email,
      password: password,
    };

    // Realizar la solicitud POST al servidor
    axios
      .post(`${URL}/login`, formData)
      .then((response) => {
        // Manejar la respuesta del servidor (por ejemplo, guardar el token)
        const token = response.data.token;
        localStorage.setItem("token", token);
        if (response.status === 220) {
          setErrorMessage("La Contraseña es Incorrecta");
        } else if (response.status === 200) {
          setIsLoading(true);
          // setea el user y lo pone en true para saber que el usuario inicio sesion
          setUser(true);
          // carga la informacion del perfil en user
          fetchUserProfile();
          setSuccessMessage("Inicio de sesión exitoso");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (response.status === 229) {
          setErrorMessage("El Usuario con ese Email no Existe!");
        }
      })
      .catch((error) => {
        // Manejar los errores de la solicitud (por ejemplo, mostrar un mensaje de error)
        console.error(error);
        setErrorMessage("Error Desde El Servidor");
        setSuccessMessage("");
      });
  };
  return (
    <div className="Login">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <form onSubmit={handleSubmit} className="form-login">
        {isLoading && (
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <h4>Iniciar sesión</h4>
        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-envelope fa-sm icon-input"></i>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="on"
            />
          </div>
          <div className="input">
            <img className="icon-input" src={iconPassword} alt="icono password login de smartbet" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <img
              className="icon-mostar-pass"
              onClick={() => setShowPassword(!showPassword)}
              src={`${showPassword ? mostrarPass : ocultarPass}`}
              alt="icono ocultar password login de smartbet"
            />
          </div>
        </div>
        <p>
          <Link to="/recuperar-contraseña">¿Has olvidado tu contraseña?</Link>
        </p>
        <p className="texto-login">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
        {successMessage && <p className="success-message">{successMessage}</p>}{" "}
        {/* Muestra el mensaje de éxito si existe */}
        <button type="submit" className=" btn-login">
          Iniciar sesión
        </button>
      </form>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
