import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();
const oddsmatcherGratis = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navegar a la página de inicio de sesión
    await page.goto(`${process.env.URL_LOGIN}/login/`);

    // Rellenar los campos de inicio de sesión
    await page.type("#user_login", process.env.EMAIL);
    await page.type("#user_pass", process.env.PASS);

    // Enviar el formulario de inicio de sesión
    await Promise.all([
      page.waitForNavigation(), // Esperar a que se cargue la nueva página después del inicio de sesión
      page.click("#wp-submit"),
    ]);

    // Realizar la solicitud GET a la página web deseada
    await page.goto(`${URL_SCRAPING}/oddsmatcher-gratuito-2/`);

    // Esperar a que el elemento #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget");

    // Esperar a que el selector específico dentro de #sbet_widget esté presente en la página
    await page.waitForSelector("#sbet_widget #sbet_table_container");

    // Obtener el contenido dentro del elemento #sbet_widget
    const sbetWidgetContent = await page.$eval("#sbet_widget", (element) => element.innerHTML);

    res.send(sbetWidgetContent);
    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el contenido de la página");
  }
};

export default oddsmatcherGratis;
