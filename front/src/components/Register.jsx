import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mostrarPass from "./img/mostrarPass.png";
import ocultarPass from "./img/ocultarPass.png";
import ellipse from "./img/ellipse.webp";
import "./styles/login-register.css";
export default function Register({ URL, user }) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Variable de estado para el mensaje de error
  const [successMessage, setSuccessMessage] = useState(""); // Variable de estado para el mensaje de éxito
  const [isLoading, setIsLoading] = useState(false); // Variable de estado para controlar el estado de carga
  const [showPassword, setShowPassword] = useState(false); // si muestra la contraseña o no
  const [termsAccepted, setTermsAccepted] = useState(false);
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

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      setErrorMessage("Debes aceptar los términos de uso");
      return;
    }
    // meto los datos de lo inputs en el objeto formData
    const formData = {
      email: email,
      userName: userName,
      password: password,
      repeatPassword: repeatPassword,
    };
    axios
      // hago la peticion post a la base de datos
      .post(`${URL}/register`, formData)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("El usuario se registró con éxito");
          setIsLoading(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else if (response.status === 203) {
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("error!");
        setSuccessMessage("");
      });
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
        <h1>Regístrate gratis</h1>
        <div className="inputs">
          <div className="input">
            <i className="fa-solid fa-envelope icon-input"></i>
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
            <i className="fa-solid fa-user icon-input"></i>
            <input
              type="text"
              placeholder="UserName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input">
            <i className="fa-solid fa-lock icon-input"></i>
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
          <div className="input">
            <i className="fa-solid fa-lock icon-input"></i>
            <input
              type="password"
              placeholder="Repite tu password"
              className="form-control"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="texto-form">
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
          <div className="terminos-condiciones">
            <input type="checkbox" checked={termsAccepted} onChange={handleTermsChange} />
            <label htmlFor="termsCheckbox">
              Acepto los <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
            </label>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
        {successMessage && <p className="success-message">{successMessage}</p>}{" "}
        {/* Muestra el mensaje de éxito si existe */}
        <button type="submit" className="btn-form">
          Regístrate
        </button>
      </form>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
