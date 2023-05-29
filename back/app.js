import express from "express";
import cors from "cors";
import register from "./register.js";
import login from "./login.js";
import perfil from "./perfil.js";
import logout from "./logout.js";
const app = express();
app.use(express.json());
app.use(cors());

// Endpoint de registro
app.post("/register", register);
// Endpoint de login
app.post("/login", login);
// Endpoint de login
app.get("/perfil", perfil);
// Endpoint de logout
app.delete("/logout", logout);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto: ${PORT}`);
});
