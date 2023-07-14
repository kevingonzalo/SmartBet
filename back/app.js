import express from "express";
import cors from "cors";
import register from "./rutas/register.js";
import login from "./rutas/login.js";
import perfil from "./rutas/perfil.js";
import logout from "./rutas/logout.js";
import recuperarPass from "./rutas/recuperarPass.js";
import resetPassword from "./rutas/resetPassword.js";
import oddsmatcherGratis from "./rutas/OddsmatchedGratis.js";
import OddsmatcherPremium from "./rutas/OddsmatcherPremium.js";
import ScrapingGratis from "./rutas/ScrapingGratis.js";
import ScrapingPremium from "./rutas/ScrapingPremium.js";
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
// Endpoint de recuperar contraseña
app.post("/recuperarPass", recuperarPass);
// Endpoint de recuperar contraseña y envio de token
app.put("/resetpassword/:tokenPass", resetPassword);
// Endpoint para cargar oddsmatcherGratis
app.get("/oddsmatcherGratis", oddsmatcherGratis);
// Endpoint para cargar OddsmatcherPremium
app.get("/OddsmatcherPremium", OddsmatcherPremium);
// hago scraping de los datos de la pagina web cada 1 hora
ScrapingGratis();
ScrapingPremium();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto: ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("servidor funcionando correctamente!");
});
