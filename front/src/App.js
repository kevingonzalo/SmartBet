import "./App.css";
import "./components/styles/variables.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Perfil from "./components/Perfil";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagar from "./components/Pagar";
const URL = process.env.REACT_APP_URL;
function App() {
  // verifica si hay un inicio de sesion en la web
  const [user, setUser] = useState(null);
  const fetchUserProfile = async () => {
    try {
      // Obtener el token del LocalStorage
      const token = localStorage.getItem("token");

      // Verificar si el token está presente
      if (!token) {
        // No hay token, no se hace la petición y se establece el usuario como null
        setUser(null);
        return;
      }

      // Hacer la petición para obtener los datos del usuario
      const response = await axios.get(`${URL}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Almacenar los datos del usuario en el estado
      setUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
