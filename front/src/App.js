import "./App.css";
import "./components/styles/variables.css";
import "./components/styles/img-fondo.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Perfil from "./components/Perfil";
import axios from "axios";
import Pagar from "./components/Pagar";
import Recuperarpass from "./components/Recuperarpass";
import Resetpassword from "./components/Resetpassword";
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
          <Route path="/register" element={<Register URL={URL} />} />
          <Route path="/login" element={<Login URL={URL} setUser={setUser} fetchUserProfile={fetchUserProfile} />} />
          <Route path="/perfil" element={<Perfil URL={URL} user={user} />} />
          <Route path="/pagar" element={<Pagar URL={URL} user={user} />} />
          <Route path="/recuperar-contraseña" element={<Recuperarpass URL={URL} />} />
          <Route path="/resetpassword" element={<Resetpassword URL={URL} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
