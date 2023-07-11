import puppeteer from "puppeteer";
import conexion from "../connect/conexion.js";
import dotenv from "dotenv";

dotenv.config();

const urlScraping = process.env.URL_SCRAPING;
const user = process.env.USER;
const password = process.env.PASS;

const ScrapingPremium = async () => {
  try {
    // para prubas en windows
    // const browser = await puppeteer.launch({
    //   headless: "new",
    //   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // });
    // //para servidor linux
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "/usr/bin/google-chrome-stable",
    });

    const page = await browser.newPage();

    await page.goto(`${urlScraping}/login/`);

    await page.type("#user_login", user);
    await page.type("#user_pass", password);

    await Promise.all([page.waitForNavigation({ timeout: 60000 }), page.click("#wp-submit")]);

    await page.goto(`${urlScraping}/oddsmatcher-nuevo/`);

    await page.waitForSelector("#sbet_widget", { timeout: 60000 });
    await page.waitForSelector("#sbet_widget #sbet_table_container", { timeout: 60000 });

    const totalPages = await page.$eval("#sbet_total_pages", (element) => parseInt(element.textContent));
    console.log("Paginas Premium Cargadas" + totalPages);

    const fechas = [];
    const partido = [];
    const competicion = [];
    const apuesta = [];
    const rating = [];
    const casa = [];
    const afavor = [];
    const contra = [];
    const liquidez = [];
    const actualizado = [];
    const datos = [];

    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      const fechaElements = await page.$$eval(".date span", (elements) => elements.map((element) => element.textContent));
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

      fechas.push(...fechaElements);
      partido.push(...partidoElements);
      competicion.push(...competicionElements);
      apuesta.push(...apuestaElements);
      rating.push(...ratingElements);
      casa.push(...casaElements);
      afavor.push(...afavorElements);
      contra.push(...contraElements);
      liquidez.push(...liquidezElements);
      actualizado.push(...actualizadoElements);

      if (pageNumber !== totalPages) {
        await page.click("#sbet_next_page");
        await page.waitForNavigation({ timeout: 60000 });
      }
    }

    for (let i = 0; i < fechas.length; i++) {
      const dato = {
        fecha: fechas[i],
        partido: partido[i],
        competicion: competicion[i],
        apuesta: apuesta[i],
        rating: rating[i],
        casa: casa[i],
        afavor: afavor[i],
        contra: contra[i],
        liquidez: liquidez[i],
        actualizado: actualizado[i],
        totalPages: totalPages,
      };
      datos.push(dato);
    }

    if (datos.length > 0) {
      await new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM premium";
        conexion.query(deleteQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Datos existentes eliminados exitosamente de la base de datos.");
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
        "INSERT INTO premium (Fecha, Partido, Competicion, Apuesta, Rating, Casa, Afavor, Contra, Liquidez, Actualizado,totalPages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

      await Promise.all(
        datos.map((dato) => {
          const { fecha, partido, competicion, apuesta, rating, casa, afavor, contra, liquidez, actualizado, totalPages } = dato;
          const values = [fecha, partido, competicion, apuesta, rating, casa, afavor, contra, liquidez, actualizado, totalPages];

          return new Promise((resolve, reject) => {
            conexion.query(insertQuery, values, (error, results) => {
              if (error) {
                reject(error);
              } else {
                console.log("Nuevos datos guardados exitosamente en la base de datos.");
                resolve();
              }
            });
          });
        })
      );
    } else {
      console.log("No hay datos a guardar");
    }

    await browser.close();
  } catch (error) {
    console.error("Error durante el scraping y guardado de datos:", error);
  }

  console.log("Fin premium");
};

const intervalo = 3600000; // 1 hora en milisegundos
setInterval(ScrapingPremium, intervalo);

export default ScrapingPremium;
