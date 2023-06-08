import express from "express";
import conexion from "../connect/conexion.js";

const router = express.Router();

// Ruta para eliminar el tokenPass de la base de datos
const deleteTokenPass = (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Obtener el token del encabezado Authorization
  const query = "UPDATE usuarios SET tokenPass = NULL WHERE tokenPass = ?";

  conexion.query(query, [token], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al eliminar el tokenPass de la base de datos" });
    }

    if (results.affectedRows === 1) {
      return res.status(200).json({ message: "TokenPass eliminado correctamente de la base de datos" });
    } else {
      return res.status(404).json({ message: "TokenPass no encontrado en la base de datos" });
    }
  });
};

export default deleteTokenPass;
