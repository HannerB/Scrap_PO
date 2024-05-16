import puppeteer from 'puppeteer';

// Función para lanzar el navegador
async function launchBrowser(executablePath, userDataDir) {
    return await puppeteer.launch({
        headless: true, // Cambiar a false para ver el navegador en acción
        executablePath: executablePath,
        userDataDir: userDataDir
    });
}

// Función para extraer datos de una página
async function extractDataFromPage(page, url, teamSelector, quotaSelector) {
    // Navegar a la página y esperar los selectores
    await page.goto(url, { timeout: 180000 });
    await page.waitForSelector(teamSelector);
    await page.waitForSelector(quotaSelector);

    // Extraer datos de la página
    const result = await page.evaluate((teamSelector, quotaSelector) => {
        const teamsElements = document.querySelectorAll(teamSelector);
        const quotaElements = document.querySelectorAll(quotaSelector);
        const teams = Array.from(teamsElements).map(element => element.innerText);
        const quotas = Array.from(quotaElements).map(element => element.innerText);
        console.log("Teams:", teams);
        console.log("Quotas:", quotas);
        return teams.map((team, i) => ({ team, quota: quotas[i] }));
    }, teamSelector, quotaSelector);

    console.log("Resultados:", result);
    return result;
}

// Función para obtener datos de una página específica
async function getDataFromPage(url, teamSelector, quotaSelector, executablePath, userDataDir) {
    let browser;
    try {
        browser = await launchBrowser(executablePath, userDataDir);
        const page = await browser.newPage();

        // Configurar la interceptación de solicitudes para evitar cargar imágenes y hojas de estilo
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort();
            } else {
                req.continue();
            }
        });

        // Extraer datos de la página
        const result = await extractDataFromPage(page, url, teamSelector, quotaSelector);
        
        return result;
    } catch (error) {
        console.error(`Ocurrió un error al obtener los datos de la página ${url}:`, error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Función para obtener datos de la primera página
export async function getDataFromFirstPage() {
    const url = 'https://betplay.com.co/apuestas#sports-hub/basketball/nba';
    const teamSelector = 'div.KambiBC-event-participants__name--team-logo';
    const quotaSelector = 'div.eMQclt';
    const executablePath = 'C:\\Users\\hanne\\Slimjet\\slimjet.exe';
    const userDataDir = 'C:\\Users\\hanne\\AppData\\Local\\Slimjet\\User Data\\Persona 1';

    return await getDataFromPage(url, teamSelector, quotaSelector, executablePath, userDataDir);
}

// Función para obtener datos de la segunda página
export async function getDataFromSecondPage() {
    const url = 'https://www.rushbet.co/?page=sportsbook&group=1000093652&type=matches';
    const teamSelector = 'div.sc-dovDVA.ckPsfI';
    const quotaSelector = 'li.sc-bYXICO.fCeFYa';
    const executablePath = 'C:\\Users\\hanne\\Slimjet\\slimjet.exe';
    const userDataDir = 'C:\\Users\\hanne\\AppData\\Local\\Slimjet\\User Data\\Persona 1';

    return await getDataFromPage(url, teamSelector, quotaSelector, executablePath, userDataDir);
}