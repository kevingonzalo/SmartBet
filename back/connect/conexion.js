import mysql from "mysql2";

const conexion = mysql.createPool({
  host: process.env.DB_HOST || "bu3irltlyjmbcaklf3ux-mysql.services.clever-cloud.com",
  user: process.env.DB_USER || "uncvuspgchvoptfg",
  password: process.env.DB_PASSWORD || "UEw4LrdLZsmyIk7zmY4k",
  database: process.env.DB_DATABASE || "bu3irltlyjmbcaklf3ux",
});

export default conexion;
