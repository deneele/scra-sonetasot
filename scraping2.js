const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const fs = require("fs");

(async () => {
  try {
    totalPages = 70;
    const data = [];
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    setTimeout(function () {}, 2000);
    const finalItems = [];
    for (let index = 0; index < totalPages; index++) {
      const element = index;
      setTimeout(function () {}, 2000);
      const response = await page.goto(
        `https://sedeco.jalisco.gob.mx/view-export-noticias/json?page=${index}`
      );
      const body = await  response.json(); 
      console.log("pagina", index);
        finalItems.push(body); 

    }
    console.log(finalItems, 'finalItems');
    fs.writeFile("./noticias.json", JSON.stringify(finalItems), (err) => {
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
