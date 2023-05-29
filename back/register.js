import bcrypt from "bcrypt";
import connection from "./connection.js";

const register = async (req, res) => {
  console.log(req.body);
  const { email, userName, password, repeatPassword } = req.body;

  let passwordHash = await bcrypt.hash(password, 8); //encriptar contraseña
  const query = `SELECT * FROM usuarios WHERE email = "${email}"`;
  connection(query)
    .then((results) => {
      // verifico si el usuario existe
      if (results.length > 0) {
        console.log(results);
        res.status(203).json({ error: "el usuario ya existe" });
      } else {
        if (password !== repeatPassword) {
          res.status(205).json({ error: "Las contraseñas no coinciden" });
          return;
        }
        // insertar el usuario a la base de datos
        const insertQuery = `INSERT INTO usuarios (email, username, password) VALUES ('${email}','${userName}','${passwordHash}')`;

        connection(insertQuery)
          .then((results) => {
            res.status(200).json({ message: "el usuario se registro con exito!" });
          })
          .catch((err) => {
            console.error(err);
            res.status(404).json({ error: "Error en la solicitud" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "error al consultar la base de datos" });
    });
};
export default register;