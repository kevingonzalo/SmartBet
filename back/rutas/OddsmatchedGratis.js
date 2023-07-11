import conexion from "../connect/conexion.js";

const oddsmatcherGratis = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM gratis";
    conexion.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error al obtener los datos de la tabla gratis:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla gratis" });
      } else {
        const datos = results.map((row) => {
          return {
            id: row.id,
            fecha: row.Fecha,
            partido: row.Partido,
            competicion: row.Competicion,
            apuesta: row.Apuesta,
            rating: row.Rating,
            casa: row.Casa,
            afavor: row.Afavor,
            contra: row.Contra,
            liquidez: row.Liquidez,
            actualizado: row.Actualizado,
            totalPages: row.totalPages,
          };
        });
        res.status(200).json({ datos });
      }
    });
  } catch (error) {
    console.error("Error al obtener los datos de la tabla gratis:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla gratis" });
  }
};

export default oddsmatcherGratis;
