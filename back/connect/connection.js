import mysql from "mysql2";
import dotenv from "dotenv";
import retry from "retry";
dotenv.config();

const connection = (query) => {
  const operation = retry.operation({
    retries: 3,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 60000,
  });
  return new Promise((resolve, reject) => {
    operation.attempt((currentAttempt) => {
      const conn = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });
      conn.connect((err) => {
        if (err) {
          console.error(`Connection error: ${err.stack}`);
          reject(err);
        } else {
          console.log(`Retrying (${currentAttempt})...`);
        }
      });
      conn.query(query, (error, results, fields) => {
        conn.end(); //cerrar la conexion
        if (error) {
          console.error(`Query error: ${error.stack}`);
          if (operation.retry(error)) {
            console.log(`Retrying (${currentAttempt})...`);
          } else {
            reject(error);
          }
        } else {
          resolve(results);
        }
      });
    });
  });
};

// verificar si se puede conectar a la base de datos
connection("SELECT 1")
  .then(() => {
    console.log("Conexión exitosa a la base de datos!");
  })
  .catch((error) => {
    console.error("No se pudo conectar a la base de datos: ", error);
  });

export default connection;
