import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import conexion from "../connect/conexion.js";
dotenv.config();

// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "smartbet804@gmail.com",
    pass: "krfbujvnilschgog",
  },
});

// Ruta para solicitar recuperación de contraseña
const recuperarPass = (req, res) => {
  const { email } = req.body;

  // Verificar si el correo electrónico existe en la base de datos
  const query = "SELECT * FROM usuarios WHERE email = ?";
  conexion.query(query, [email], (error, results) => {
    if (error) {
      console.log(error);
      return res.status(203).json({ error: "Error al buscar el correo electrónico" });
    }

    // Si el correo electrónico no existe
    if (results.length === 0) {
      return res.status(203).json({ error: "No Existe un Usuario con ese Correo!" });
    }

    // Generar un token único para el restablecimiento de contraseña
    const tokenPass = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: "1h" });

    // Enviar el correo electrónico al usuario con el enlace para restablecer la contraseña
    const resetLink = `http://smartbet.surge.sh/#/resetpassword?token=${tokenPass}`;
    // const resetLink = `http://localhost:3000/#/resetpassword?token=${tokenPass}`;
    const correoOptions = {
      from: "SmartBet <no-reply@smartbet.com>",
      to: email,
      subject: "Recuperación de contraseña",
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
    };

    transporter.sendMail(correoOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al enviar el correo electrónico" });
      }
      console.log("Correo electrónico enviado:", info.response);

      return res.status(200).json({
        tokenPass,
        message: `Correo electrónico enviado correctamente!`,
      });
    });
  });
};

export default recuperarPass;
