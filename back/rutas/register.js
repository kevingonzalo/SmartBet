import bcrypt from "bcrypt";
import connection from "../connect/connection.js";
import nodemailer from "nodemailer";
// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smartbet804@gmail.com",
    pass: process.env.PASS_EMAIL,
  },
});
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
        res.status(203).json({ message: "el usuario ya existe" });
      } else {
        // se fija si la longitud de la contraseña es entre 8 y 20 caracteres
        if (password.length < MIN_PASSWORD_LENGTH) {
          res.status(203).json({ message: "¡La Contraseña Debe Contener almenos 8 Carateres!" });
          return;
        } else if (password.length > MAX_PASSWORD_LENGTH) {
          res.status(203).json({ message: "¡La Contraseña Debe Contener 20 Carateres o Menos!" });
          return;
        }
        // checkea que las contraseñas sean iguales
        if (password !== repeatPassword) {
          res.status(203).json({ message: "Las contraseñas no coinciden" });
          return;
        }
        // insertar el usuario a la base de datos
        const insertQuery = `INSERT INTO usuarios (email, username, password) VALUES ('${email}','${userName}','${passwordHash}')`;

        connection(insertQuery)
          .then((results) => {
            const correoOptions = {
              from: "SmartBet <no-reply@smartbet.com>",
              to: email,
              subject: "¡Bienvenido a SmartBet!",
              text: `Hola ${userName},
          
              ¡Bienvenido a SmartBet! Nos alegra que te hayas registrado en nuestra página y te damos una cálida bienvenida a nuestra comunidad de apuestas deportivas en línea.
              
              Si tienes alguna pregunta o necesitas ayuda, nuestro equipo de soporte estará encantado de ayudarte en cualquier momento. Puedes ponerte en contacto con nosotros a través de smartbet804@gmail.com.
              
              Esperamos que disfrutes de tu tiempo en SmartBet y te deseamos mucha suerte en tus apuestas.
              
              Saludos cordiales,
              
              Equipo de SmartBet.
              `,
            };

            transporter.sendMail(correoOptions, (error, info) => {
              if (error) {
                console.log(error);
                return res.status(500).json({ error: "Error al enviar el correo electrónico" });
              }
              console.log("Correo electrónico enviado:", info.response);

              return res.status(200).json({
                message: `Correo electrónico enviado correctamente!`,
              });
            });
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
