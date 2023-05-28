import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const conexion = mysql.createPool({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASS || "",
  port: process.env.PORT,
  database: process.env.DATABASE || "prueba_smartbet",
});
// Generar clave secreta para el token
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const TOKEN_SECRET = generateSecretKey();

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM usuarios WHERE email = "${email}"`;

  conexion.query(query, (error, results) => {
    if (results.length > 0) {
      let pass = results[0].password;
      const user = results[0];
      bcrypt.compare(password, pass, (err, result) => {
        // busca si la contraseña es correcta
        if (result) {
          // Generar un token de autenticación utilizando JWT
          const token = jwt.sign({ userId: user.id, email: user.email }, TOKEN_SECRET, { expiresIn: "2h" });
          res.status(200).json({ token });
        } else {
          console.log(err);
          res.status(220).json({ err: "Error Contraseña Incorrecta" });
        }
      });
    } else {
      console.log(error);
      res.status(229).json({ error: "El Usuario con ese Email no Existe!" });
    }
  });
};

export default login;
