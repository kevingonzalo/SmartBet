import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const URL = "http://localhost:8000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Variable de estado para el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Variable de estado para el mensaje de éxito
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
          setSuccessMessage("Inicio de sesión exitoso");
          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate("/");
          }, 3000);
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
      <form onSubmit={handleSubmit} className="form-login">
        {isLoading && (
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <h4>Iniciar sesión</h4>
        <div className="inputs">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <p>
          <a href="/recuperar-contraseña">¿Has olvidado tu contraseña?</a>
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
    </div>
  );
}
