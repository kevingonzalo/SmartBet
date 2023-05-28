import "./styles/register.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ URL }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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

    const formData = {
      email: email,
      userName: userName,
      password: password,
      repeatPassword: repeatPassword,
    };

    axios
      .post(`${URL}/register`, formData)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("El usuario se registró con éxito");
          setErrorMessage("");
          setIsLoading(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else if (response.status === 205) {
          setErrorMessage("Las contraseñas no coinciden");
        } else if (response.status === 203) {
          setErrorMessage("Ya Hay un Usuario Registrado con ese Correo!");
        } else if (response.status === 200) {
          setErrorMessage("El usuario ya existe");
        } else if (response.status === 404) {
          setErrorMessage("Error en la solicitud");
        } else if (response.status === 500) {
          setErrorMessage("error al consultar la base de datos");
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("¡Se deben Rellenar todos los Campos!");
        setSuccessMessage("");
      });
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="form-register">
        {isLoading && (
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <h4>Regístrate gratis</h4>
        <div className="inputs">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="UserName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Repite tu password"
              className="form-control"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <p className="texto-register">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
        {successMessage && <p className="success-message">{successMessage}</p>}{" "}
        {/* Muestra el mensaje de éxito si existe */}
        <button type="submit" className=" btn-register ">
          Regístrate
        </button>
      </form>
    </div>
  );
}
