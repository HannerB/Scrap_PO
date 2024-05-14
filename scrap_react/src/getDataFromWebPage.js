// // getDataFromWebPage.js

// import puppeteer from 'puppeteer';

// async function getDataFromWebPage() {
//     let browser;
//     try {
//         browser = await puppeteer.launch({ headless: true });
//         const page = await browser.newPage();

//         // Configuración de interceptación de solicitudes
//         await page.setRequestInterception(true);
//         page.on('request', (req) => {
//             if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
//                 req.abort();
//             } else {
//                 req.continue();
//             }
//         });

//         // Ir a la página y esperar los selectores
//         await page.goto('https://betplay.com.co/apuestas#sports-hub/basketball/nba', { timeout: 90000 });
//         await page.waitForSelector("div.KambiBC-event-participants__name--team-logo");
//         await page.waitForSelector('div.eMQclt');

//         // Extraer datos de la página
//         const result = await page.evaluate(() => {
//             const teamsElements = document.querySelectorAll("div.KambiBC-event-participants__name--team-logo");
//             const quotaElements = document.querySelectorAll('div.eMQclt');
//             const teams = Array.from(teamsElements).map(element => element.innerText);
//             const quotas = Array.from(quotaElements).map(element => element.innerText);
//             return teams.map((team, i) => ({ team, quota: quotas[i] }));
//         });

//         return result;
//     } catch (error) {
//         console.error('Ocurrió un error al obtener los datos:', error);
//         throw error; // Relanzar el error para que sea capturado en la ruta de Express
//     } finally {
//         if (browser) {
//             await browser.close();
//         }
//     }
// }

// export default getDataFromWebPage;
