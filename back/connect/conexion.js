import mysql from "mysql2";

const conexion = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "prueba_smartbet",
});

export default conexion;
