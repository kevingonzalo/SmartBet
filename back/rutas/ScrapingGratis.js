import puppeteer from "puppeteer";
import conexion from "../connect/conexion.js";
import dotenv from "dotenv";

dotenv.config();

const urlScraping = process.env.URL_SCRAPING;
const user = process.env.USER;
const password = process.env.PASS;

const ScrapingGratis = async () => {
  try {
    // para pruebas en Windows
    // const browser = await puppeteer.launch({
    //   headless: "new",
    //   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // });
    // //para servidor Linux
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "/usr/bin/google-chrome-stable",
    });
    const page = await browser.newPage();

    // Navegar a la página de inicio de sesión
    await page.goto(`${urlScraping}/login/`, { timeout: 60000 });

    // Rellenar los campos de inicio de sesión
    await page.type("#user_login", user);
    await page.type("#user_pass", password);

    // Enviar el formulario de inicio de sesión
    await Promise.all([
      page.waitForNavigation({ timeout: 60000 }), // Esperar a que se cargue la nueva página después del inicio de sesión
      page.click("#wp-submit"),
    ]);

    // Realizar scraping y obtener los datos deseados
    await page.goto(`${urlScraping}/oddsmatcher-gratuito-2/`, { timeout: 60000 });
    // Aquí realizas la lógica de scraping para obtener los datos deseados de la página "oddsmatcher-nuevo"
    // Esperar a que el elemento #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget", { timeout: 120000 });

    // Esperar a que el selector específico dentro de #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget #sbet_table_container", { timeout: 60000 });

    // Obtener el valor máximo de páginas desde el span con id "sbet_total_pages"
    const totalPages = await page.$eval("#sbet_total_pages", (element) => parseInt(element.textContent));
    console.log("Paginas gratis Cargadas " + totalPages);
    // Crear una matriz para almacenar los valores de las tablas
    const datosBatch = [];

    // Recorrer las páginas y obtener los valores de las tablas
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      // Obtener los valores de las tablas
      const fechaElements = await page.$$eval(".date span", (elements) => elements.map((element) => element.textContent));
      const deporteElements = await page.$$eval(".sbet_match", (elements) =>
        elements.map((element) => {
          const hasCircle = element.querySelector("circle") !== null;
          const deporte = hasCircle ? "futbol" : "tennis";
          return deporte;
        })
      );
      const partidoElements = await page.$$eval(".sbet_match div span", (elements) =>
        elements.map((element) => element.textContent)
      );
      const competicionElements = await page.$$eval(".sbet_league", (elements) => elements.map((element) => element.textContent));
      const apuestaElements = await page.$$eval(".name", (elements) => elements.map((element) => element.textContent));
      const ratingElements = await page.$$eval(".rating span", (elements) => elements.map((element) => element.textContent));
      const casaElements = await page.$$eval(".bookmaker div", (elements) =>
        elements.map((element) => element.getAttribute("title"))
      );
      const afavorElements = await page.$$eval(".back", (elements) => elements.map((element) => element.textContent));
      const contraElements = await page.$$eval(".lay", (elements) => elements.map((element) => element.textContent));
      const liquidezElements = await page.$$eval(".volume", (elements) => elements.map((element) => element.textContent));
      const actualizadoElements = await page.$$eval(".u", (elements) => elements.map((element) => element.textContent));

      // Agregar los valores de las tablas a la matriz
      for (let i = 0; i < fechaElements.length; i++) {
        const dato = {
          fecha: fechaElements[i],
          deporte: deporteElements[i],
          partido: partidoElements[i],
          competicion: competicionElements[i],
          apuesta: apuestaElements[i],
          rating: ratingElements[i],
          casa: casaElements[i],
          afavor: afavorElements[i],
          contra: contraElements[i],
          liquidez: liquidezElements[i],
          actualizado: actualizadoElements[i],
          totalPages,
        };
        datosBatch.push(dato);
      }

      // Navegar a la siguiente página (excepto en la última iteración)
      if (pageNumber !== totalPages) {
        await page.click("#sbet_next_page", { timeout: 60000 }); // Hacer clic en el botón de "Siguiente página"
      }
    }

    if (datosBatch.length > 0) {
      // Eliminar los datos existentes en la base de datos
      await new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM gratis";
        conexion.query(deleteQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Datos existentes eliminados exitosamente de la base de datos gratis.");
            resolve();
          }
        });
      });

      // Reiniciar el valor del AUTO_INCREMENT a 1
      await new Promise((resolve, reject) => {
        const alterQuery = "ALTER TABLE gratis AUTO_INCREMENT = 1";
        conexion.query(alterQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Valor del AUTO_INCREMENT reiniciado a 1.");
            resolve();
          }
        });
      });

      // Insertar los datos del scraping en la base de datos en forma de lote
      const insertQuery =
        "INSERT INTO gratis (Fecha,Deporte, Partido, Competicion, Apuesta, Rating, Casa, Afavor, Contra, Liquidez, Actualizado, totalPages) VALUES ?";

      await new Promise((resolve, reject) => {
        conexion.query(insertQuery, [datosBatch.map(Object.values)], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Nuevos datos guardados exitosamente en la base de datos gratis.");
            resolve();
          }
        });
      });
    } else {
      console.log("No hay datos a guardar");
    }

    await browser.close();
  } catch (error) {
    console.error("Error durante el scraping y guardado de datos:", error);
  }
  console.log("Fin gratis");
};

// Configurar temporizador para ejecutar la función cada hora (3600000 ms)
const intervalo = 3600000; // 1 hora en milisegundos
setInterval(ScrapingGratis, intervalo);

export default ScrapingGratis;
