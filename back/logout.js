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
const logout = (req, res) => {
  const userId = req.body.userId;

  // Realiza la consulta para eliminar el token del usuario en la base de datos
  const query = "UPDATE usuarios SET token = NULL WHERE id = ?";
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
