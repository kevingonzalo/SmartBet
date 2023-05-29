import "./App.css";
import "./components/styles/variables.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Perfil from "./components/Perfil";
import { useState } from "react";
import axios from "axios";
const URL = process.env.REACT_APP_URL;
function App() {
  // verifica si hay un inicio de sesion en la web
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      // Obtener el token del LocalStorage
      const token = localStorage.getItem("token");
      // Hacer la petición para obtener los datos del usuario
      const response = await axios.get(`${URL}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Almacenar los datos del usuario en el estado
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
      // Manejar el error de la petición
    }
  };

  return (
    <div className="App">
      <HashRouter>
        <NavBar user={user} URL={URL} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register URL={URL} />} />
          <Route path="/login" element={<Login URL={URL} setUser={setUser} fetchUserProfile={fetchUserProfile} />} />
          <Route path="/perfil" element={<Perfil URL={URL} user={user} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
