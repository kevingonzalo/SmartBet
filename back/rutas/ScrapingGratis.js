import puppeteer from "puppeteer";
import conexion from "../connect/conexion.js";
import dotenv from "dotenv";

dotenv.config();

const urlScraping = process.env.URL_SCRAPING;
const user = process.env.USER;
const password = process.env.PASS;

const ScrapingGratis = async () => {
  try {
    // para prubas en windows
    // const browser = await puppeteer.launch({
    //   headless: "new",
    //   executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // });
    //para servidor linux
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: "/usr/bin/google-chrome-stable",
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
    await page.goto(`${urlScraping}/oddsmatcher-gratuito-2/`);
    // Aquí realizas la lógica de scraping para obtener los datos deseados de la página "oddsmatcher-nuevo"
    // Esperar a que el elemento #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget");

    // Esperar a que el selector específico dentro de #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget #sbet_table_container");

    // Obtener el valor máximo de páginas desde el span con id "sbet_total_pages"
    const totalPages = await page.$eval("#sbet_total_pages", (element) => parseInt(element.textContent));
    console.log("Paginas gratis Cargadas" + totalPages);
    // Crear un array para almacenar los valores de las tablas
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
    // Recorrer las páginas y obtener los valores de fecha de la clase "date"
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      // Obtener los valores de las tablas
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

      // Agregar los valores de fecha al array
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
      // Navegar a la siguiente página (excepto en la última iteración)
      if (pageNumber !== totalPages) {
        await page.click("#sbet_next_page"); // Hacer clic en el botón de "Siguiente página"
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
      // Eliminar los datos existentes en la base de datos
      await new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM gratis";
        conexion.query(deleteQuery, (error, results) => {
          if (error) {
            reject(error);
          } else {
            console.log("Datos existentes eliminados exitosamente de la base de datos.");
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

      // Insertar los datos del scraping en la base de datos
      const insertQuery =
        "INSERT INTO gratis (Fecha, Partido, Competicion, Apuesta, Rating, Casa, Afavor, Contra, Liquidez, Actualizado,totalPages) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

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
  console.log("Fin gratis");
};

// Configurar temporizador para ejecutar la función cada hora (3600000 ms)
const intervalo = 3600000; //1 hora en milisegundos
setInterval(ScrapingGratis, intervalo);

export default ScrapingGratis;
