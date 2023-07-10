import conexion from "../connect/conexion";
import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const urlScraping = process.env.URL_SCRAPING;
const user = process.env.USER;
const password = process.env.PASS;

const Scraping = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    });
    const page = await browser.newPage();

    // Navegar a la página de inicio de sesión
    await page.goto(`${urlScraping}/login/`);

    // Rellenar los campos de inicio de sesión
    await page.type("#user_login", user);
    await page.type("#user_pass", password);

    // Enviar el formulario de inicio de sesión
    await Promise.all([
      page.waitForNavigation(), // Esperar a que se cargue la nueva página después del inicio de sesión
      page.click("#wp-submit"),
    ]);

    // Realizar scraping y obtener los datos deseados
    await page.goto(`${urlScraping}/oddsmatcher-nuevo/`);
    // Aquí realizas la lógica de scraping para obtener los datos deseados de la página "oddsmatcher-nuevo"

    // Eliminar los datos existentes en la base de datos
    const deleteQuery = "DELETE FROM datos_scraping";
    conexion.query(deleteQuery, (error, results) => {
      if (error) {
        console.error("Error al eliminar los datos existentes en la base de datos:", error);
      } else {
        console.log("Datos existentes eliminados exitosamente de la base de datos.");
      }
    });

    // Guardar los nuevos datos en la base de datos
    const datos = "Datos obtenidos del scraping";
    const insertQuery = "INSERT INTO datos_scraping (id, datos) VALUES (1, ?)";
    conexion.query(insertQuery, [datos], (error, results) => {
      if (error) {
        console.error("Error al guardar los nuevos datos en la base de datos:", error);
      } else {
        console.log("Nuevos datos guardados exitosamente en la base de datos.");
      }
    });

    await browser.close();
  } catch (error) {
    console.error("Error durante el scraping y guardado de datos:", error);
  }
};

// Configurar temporizador para ejecutar la función cada hora (3600000 ms)
const intervalo = 3600000; // 1 hora en milisegundos
setInterval(Scraping, intervalo);

export default Scraping;
