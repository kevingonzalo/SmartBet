import dotenv from "dotenv";
import conexion from "../connect/conexion.js";
dotenv.config();

const logout = (req, res) => {
  const userId = req.body.userId;

  // Realiza la consulta para eliminar el token del usuario en la base de datos
  const query = "UPDATE usuarios SET tokenlogin = NULL WHERE id = ?";
  conexion.query(query, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error en el servidor" });
    }
    // Retorna una respuesta exitosa
    console.log("Token eliminado correctamente");
    return res.status(200).json({ message: "Token eliminado correctamente" });
  });
};
export default logout;
