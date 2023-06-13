import "./App.css";
import "./components/styles/variables.css";
import "./components/styles/img-fondo.css";
import { Routes, Route, HashRouter } from "react-router-dom";
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
import Herramientas from "./components/Herramientas/Herramientas";
import Calculadora from "./components/Herramientas/Calculadora";
import OddsmatcherGratis from "./components/Herramientas/OddsmatcherGratis";
import OddsmatcherPremium from "./components/Herramientas/OddsmatcherPremium";
import Premium from "./components/Herramientas/Premium";
import Perfil from "./components/Herramientas/Perfil";

const URL = process.env.REACT_APP_URL || "http://localhost:8000";

function App() {
  // verifica si hay un inicio de sesion en la web
  const [user, setUser] = useState(null);
  const fetchUserProfile = async () => {
    try {
      const tokenlogin = localStorage.getItem("tokenlogin");
      if (!tokenlogin) {
        // No hay token, no se hace la petición y se establece el usuario como null
        setUser(null);
        return;
      }

      // Hacer la petición para obtener los datos del usuario
      const response = await axios.get(`${URL}/perfil`, {
        headers: {
          Authorization: `Bearer ${tokenlogin}`,
        },
      });
      // Almacenar los datos del usuario en el estado
      setUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 205) {
        // El token es inválido o ha expirado, se establece el usuario como null
        setUser(null);
      } else {
        console.log(error);
        // Manejar otros errores de la petición
      }
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  return (
    <div className="App">
      <HashRouter>
        <NavBar user={user} URL={URL} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/register" element={<Register URL={URL} user={user} />} />
          <Route
            path="/login"
            element={<Login URL={URL} setUser={setUser} user={user} fetchUserProfile={fetchUserProfile} />}
          />
          <Route path="/recuperar-contraseña" element={<Recuperarpass URL={URL} />} />
          <Route path="/resetpassword" element={<Resetpassword URL={URL} />} />
          {/* herramientas de usuario (menu para cuando el usuario inicie sesión) */}
          <Route path="/guias" element={<Guias />} />
          {/* ///// */}
          <Route path="/bonos" element={<Bonos />} />
          {/* ///// */}
          <Route path="/herramientas" element={<Herramientas />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/Oddsmatcher-gratuito" element={<OddsmatcherGratis />} />
          <Route path="/OddsmatcherPremium" element={<OddsmatcherPremium />} />
          {/* //// */}
          <Route path="/Premium" element={<Premium />} />
          <Route path="/perfil" element={<Perfil URL={URL} user={user} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
