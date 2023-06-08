import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import conexion from "../connect/conexion.js";

dotenv.config();

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
        res.status(205).json({ error: "Error al obtener los datos del usuario" });
      } else {
        // Mostrar los datos del usuario en la respuesta
        res.status(200).json({ user: results[0] });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(205).json({ error: "Token inválido" });
  }
};

export default perfil;
