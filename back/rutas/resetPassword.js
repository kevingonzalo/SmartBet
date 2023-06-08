import conexion from "../connect/conexion.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

// Ruta para restablecer la contraseña
const resetPassword = async (req, res) => {
  const { tokenPass, password, confirmPassword } = req.body;
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 20;
  console.log(req.body);
  if (!tokenPass) {
    return res.status(203).json({ message: "TokenPass expirado o inválido" });
  }
  if (password !== confirmPassword) {
    return res.status(203).json({ message: "¿Las contraseñas no Coinciden!" });
  }
  // se fija si la longitud de la contraseña es entre 8 y 20 caracteres
  if (password.length < MIN_PASSWORD_LENGTH) {
    res.status(203).json({ message: "¡La Contraseña Debe Contener almenos 8 Carateres!" });
    return;
  } else if (password.length > MAX_PASSWORD_LENGTH) {
    res.status(203).json({ message: "¡La Contraseña Debe Contener 20 Carateres o Menos!" });
    return;
  }
  const decodedToken = jwt.decode(tokenPass);
  const email = decodedToken.email;
  let passwordHash = await bcrypt.hash(password, 8); //encriptar contraseña
  // Verificar si el correo electrónico y el token coinciden en la base de datos
  const query = "UPDATE usuarios SET password = ? WHERE email = ?";
  conexion.query(query, [passwordHash, email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error al actualizar la contraseña" });
    }

    // Comprobar si se actualizó correctamente
    if (results.affectedRows === 1) {
      // Contraseña actualizada y token eliminado con éxito
      return res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } else {
      // No se encontró ningún usuario con el tokenPass especificado
      return res.status(203).json({ message: "TokenPass expirado o inválido" });
    }
  });
};

export default resetPassword;
