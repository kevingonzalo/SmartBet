import express from "express";
import cors from "cors";
import register from "./register.js";
import login from "./login.js";

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint de registro
app.post("/register", register);
// Endpoint de login
app.post("/login", login);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor encendido en el puerto: ${PORT}`);
});
