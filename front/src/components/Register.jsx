import "./styles/register.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import username from "./img/username.svg";
import iconPassword from "./img/iconPassword.svg";
import mostrarPass from "./img/mostrarPass.png";
import ocultarPass from "./img/ocultarPass.png";
import ellipse from "./img/ellipse.webp";
export default function Register({ URL }) {
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
    }, 2000);

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
        } else if (response.status === 205) {
          setErrorMessage("Las contraseñas no coinciden");
        } else if (response.status === 203) {
          setErrorMessage("Ya Hay un Usuario Registrado con ese Correo!");
        } else if (response.status === 200) {
          setErrorMessage("El usuario ya existe");
        } else if (response.status === 404) {
          setErrorMessage("Error en la solicitud");
        } else if (response.status === 201) {
          setErrorMessage("¡La Contraseña Debe Contener almenos 8 Carateres!");
        } else if (response.status === 202) {
          setErrorMessage("¡La Contraseña Debe Contener 20 Carateres o Menos!");
        } else if (response.status === 204) {
          setErrorMessage(`¡El correo debe ser de tipo "ejemplo@gmail.com"!`);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("error!");
        setSuccessMessage("");
      });
  };
  return (
    <div className="register">
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde uno" />
      <form onSubmit={handleSubmit} className="form-register">
        {isLoading && (
          <div className="spinner-border spinner" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <h4>Regístrate gratis</h4>
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
            <img className="icon-input" src={username} alt="icono username login de smartbet" />
            <input
              type="text"
              placeholder="UserName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
          <div className="input">
            <img className="icon-input" src={iconPassword} alt="icono password login de smartbet" />
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
        <div className="links-forms">
          <p className="texto-register">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
          <div className="terms">
            <input type="checkbox" id="termsCheckbox" checked={termsAccepted} onChange={handleTermsChange} />
            <label htmlFor="termsCheckbox">
              Acepto los <Link to="/terminos-y-condiciones">Términos y Condiciones</Link>
            </label>
          </div>
        </div>
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Muestra el mensaje de error si existe */}
        {successMessage && <p className="success-message">{successMessage}</p>}{" "}
        {/* Muestra el mensaje de éxito si existe */}
        <button type="submit" className=" btn-register ">
          Regístrate
        </button>
      </form>
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde dos" />
      <img src={ellipse} alt="imagen de fondo SmartBet" className="fondo-verde tres" />
    </div>
  );
}
