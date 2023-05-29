import bcrypt from "bcrypt";
import connection from "./connection.js";

const register = async (req, res) => {
  console.log(req.body);
  const { email, userName, password, repeatPassword } = req.body;
  const MIN_PASSWORD_LENGTH = 8;
  const MAX_PASSWORD_LENGTH = 20;
  // verifica que el mail sea valido
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:gmail|hotmail|outlook|yahoo)\.[a-zA-Z]{2,7}$/;
  if (!email.match(emailRegex)) {
    res.status(204).json({ error: `¡El correo debe ser de tipo "ejemplo@gmail.com"!` });
    return;
  }

  let passwordHash = await bcrypt.hash(password, 8); //encriptar contraseña
  const query = `SELECT * FROM usuarios WHERE email = "${email}"`;
  connection(query)
    .then((results) => {
      // verifico si el usuario existe
      if (results.length > 0) {
        res.status(203).json({ error: "el usuario ya existe" });
      } else {
        // se fija si la longitud de la contraseña es entre 8 y 20 caracteres
        if (password.length < MIN_PASSWORD_LENGTH) {
          res.status(201).json({ error: "¡La Contraseña Debe Contener almenos 8 Carateres!" });
          return;
        } else if (password.length > MAX_PASSWORD_LENGTH) {
          res.status(202).json({ error: "¡La Contraseña Debe Contener 20 Carateres o Menos!" });
          return;
        }
        // checkea que las contraseñas sean iguales
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
