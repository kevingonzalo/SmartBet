import conexion from "../connect/conexion.js";

const OddsmatcherPremium = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM premium";
    conexion.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error al obtener los datos de la tabla premium:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla premium" });
      } else {
        const datos = results.map((row) => {
          return {
            id: row.id,
            fecha: row.Fecha,
            deporte: row.Deporte,
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
    console.error("Error al obtener los datos de la tabla premium:", error);
    res.status(500).json({ error: "Error al obtener los datos de la tabla premium" });
  }
};

export default OddsmatcherPremium;
