import puppeteer from "puppeteer";
import conexion from "../connect/conexion.js";
import dotenv from "dotenv";

dotenv.config();

const urlScraping = process.env.URL_SCRAPING;
const user = process.env.USER;
const password = process.env.PASS;

const ScrapingPremium = async () => {
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

    await page.goto(`${urlScraping}/login/`);

    await page.type("#user_login", user);
    await page.type("#user_pass", password);

    await Promise.all([page.waitForNavigation(), page.click("#wp-submit")]);

    await page.goto(`${urlScraping}/oddsmatcher-nuevo/`);

    await page.waitForSelector("#sbet_widget");
    await page.waitForSelector("#sbet_widget #sbet_table_container");

    const totalPages = await page.$eval("#sbet_total_pages", (element) => parseInt(element.textContent));
    // carga la mitad de las paginas para que no sea tan pesado el scraping
    console.log("Paginas Premium Cargadas " + totalPages);

    const datosBatch = [];
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
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

      if (pageNumber !== totalPages) {
        await page.click("#sbet_next_page", { timeout: 60000 }); // Hacer clic en el botón de "Siguiente página"
      }
    }

    if (datosBatch.length > 0) {
      await new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM premium";
        conexion.query(deleteQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Datos existentes eliminados exitosamente de la base de datos premium.");
            resolve();
          }
        });
      });

      await new Promise((resolve, reject) => {
        const alterQuery = "ALTER TABLE premium AUTO_INCREMENT = 1";
        conexion.query(alterQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Valor del AUTO_INCREMENT reiniciado a 1.");
            resolve();
          }
        });
      });

      const insertQuery =
        "INSERT INTO premium (Fecha,Deporte, Partido, Competicion, Apuesta, Rating, Casa, Afavor, Contra, Liquidez, Actualizado, totalPages) VALUES ?";

      await new Promise((resolve, reject) => {
        conexion.query(insertQuery, [datosBatch.map(Object.values)], (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Nuevos datos guardados exitosamente en la base de datos premium.");
            resolve();
          }
        });
      });
    } else {
      console.log("No hay datos a guardar");
    }

    await browser.close();
  } catch (error) {
    console.error("Error durante el scraping y guardado de datos en premium:", error);
  }

  console.log("Fin premium");
};

const intervalo = 3600000; // 1 hora en milisegundos
setInterval(ScrapingPremium, intervalo);

export default ScrapingPremium;
