import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import conexion from "../connect/conexion.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM usuarios WHERE email = "${email}"`;
  console.log(email);
  conexion.query(query, (error, results) => {
    console.log(results);
    console.log(error);
    if (results.length > 0) {
      let pass = results[0].password;
      const user = results[0];
      bcrypt.compare(password, pass, (err, result) => {
        // busca si la contraseña es correcta
        if (result) {
          // Generar un token de autenticación utilizando JWT y token aleatorio
          const tokenLogin = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: "7d" });

          // Actualizar el campo 'token' en la fila correspondiente del usuario en la base de datos
          const updateQuery = `UPDATE usuarios SET tokenlogin = "${tokenLogin}" WHERE id = ${user.id}`;

          conexion.query(updateQuery, (updateError, updateResults) => {
            if (updateError) {
              console.log(updateError);
              res.status(500).json({ error: "Error al actualizar el token en la base de datos" });
            } else {
              res.status(200).json({ tokenLogin });
            }
          });
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
