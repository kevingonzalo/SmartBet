import jwt from "jsonwebtoken";
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

const perfil = (req, res) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization.split(" ")[1];
  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Obtener el userId del token decodificado
    const userId = decodedToken.userId;
    // Realizar una consulta a la base de datos para obtener los datos del usuario
    const query = `SELECT * FROM usuarios WHERE id = ${userId}`;

    conexion.query(query, (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los datos del usuario" });
      } else {
        // Mostrar los datos del usuario en la respuesta
        res.status(200).json({ user: results[0] });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token inválido" });
  }
};

export default perfil;
