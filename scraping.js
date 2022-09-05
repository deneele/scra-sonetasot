const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const fs = require("fs");

(async () => {
  try {
    totalPages = 69;
    let data;
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (let index = 0; index < totalPages; index++) {
      const element = index;
      setTimeout(function () {}, 2000);

      console.log("pagina", index);
      const response = await page.goto(
        `https://sedeco.jalisco.gob.mx/view-export-noticias/json?page=${index}`
      );

      const body = await  response.json(); 

      data = JSON.stringify(body);
    }

    console.log(data, "response");
    fs.writeFile("./sedena.json",  data, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Great Success");
    });

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
