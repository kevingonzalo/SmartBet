import "./App.css";
import "./components/styles/variables.css";
import "./components/styles/img-fondo.css";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import axios from "axios";
import Recuperarpass from "./components/Recuperarpass";
import Resetpassword from "./components/Resetpassword";

// herramientas de usuario
import Guias from "./components/Herramientas/Guias";
import Bonos from "./components/Herramientas/Bonos";
import CalculadoraMatchedBetting from "./components/Herramientas/CalculadoraMatchedBetting";
import OddsmatcherGratis from "./components/Herramientas/OddsmatcherGratis";
import OddsmatcherPremium from "./components/Herramientas/OddsmatcherPremium";
import Premium from "./components/Herramientas/Premium";
import Perfil from "./components/Herramientas/Perfil";
// url para las peticiones al back
const URL = "http://192.168.0.22:8000" || process.env.REACT_APP_URL;

function App() {
  // verifica si hay un inicio de sesion en la web
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const tokenlogin = localStorage.getItem("tokenlogin");
      if (!tokenlogin) {
        // No hay token, no se hace la petición y se establece el usuario como null
        setUser(null);
        setIsCheckingUser(false); // Finaliza la verificación del usuario
        return;
      }

      // Hacer la petición para obtener los datos del usuario
      const response = await axios.get(`${URL}/perfil`, {
        headers: {
          Authorization: `Bearer ${tokenlogin}`,
        },
      });
      // Almacenar los datos del usuario en el estado
      setTimeout(() => {
        setIsCheckingUser(false); // Finaliza la verificación del usuario
        setUser(response.data.user);
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 205) {
        // El token es inválido o ha expirado, se establece el usuario como null
        setUser(null);
      } else {
        console.log(error);
        // Manejar otros errores de la petición
      }
      setTimeout(() => {
        setIsCheckingUser(false); // Finaliza la verificación del usuario
      }, 1500);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isCheckingUser) {
    return (
      <div className="spinner-container">
        <div className="spinner-border spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="spinner-text">Cargando Contenido...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <HashRouter>
        <NavBar user={user} URL={URL} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          {user ? (
            <>
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/recuperar-contraseña" element={<Navigate to="/" />} />
              <Route path="/resetpassword" element={<Navigate to="/" />} />

              <Route path="/guias" element={<Guias />} />
              {/* ///// */}
              <Route path="/bonos" element={<Bonos />} />
              {/* ///// */}
              <Route path="/CalculadoraMatchedBetting" element={<CalculadoraMatchedBetting URL={URL} />} />
              <Route path="/Oddsmatcher-gratuito" element={<OddsmatcherGratis URL={URL} />} />
              <Route path="/Oddsmatcher-Premium" element={<OddsmatcherPremium URL={URL} />} />
              {/* //// */}
              <Route path="/Premium" element={<Premium />} />
              <Route path="/perfil" element={<Perfil URL={URL} user={user} />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register URL={URL} user={user} />} />
              <Route
                path="/login"
                element={<Login URL={URL} setUser={setUser} user={user} fetchUserProfile={fetchUserProfile} />}
              />
              <Route path="/recuperar-contraseña" element={<Recuperarpass URL={URL} />} />
              <Route path="/resetpassword" element={<Resetpassword URL={URL} />} />
            </>
          )}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
