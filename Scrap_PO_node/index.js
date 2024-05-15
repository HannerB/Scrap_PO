import puppeteer from 'puppeteer';

// Función para obtener datos de la primera página
export async function getDataFromFirstPage() {
    const browser = await puppeteer.launch({
        headless: true, // Cambiar a false para ver el navegador en acción
        // Asegúrate de proporcionar la ruta correcta al ejecutable de tu navegador
        executablePath: 'C:\\Users\\hanne\\Slimjet\\slimjet.exe',
        // Asegúrate de proporcionar la ruta correcta al directorio de datos de tu perfil
        userDataDir: 'C:\\Users\\hanne\\AppData\\Local\\Slimjet\\User Data\\Persona 1'
    });

    try {
        const page = await browser.newPage();

        // Configura la interceptación de solicitudes para evitar cargar imágenes y hojas de estilo
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort();
            } else {
                req.continue();
            }
        });

        // Navega a la primera página y espera los selectores
        await page.goto('https://betplay.com.co/apuestas#sports-hub/basketball/nba', { timeout: 180000 });
        await page.waitForSelector("div.KambiBC-event-participants__name--team-logo");
        await page.waitForSelector('div.eMQclt');

        // Extrae datos de la página
        const result = await page.evaluate(() => {
            const teamsElements = document.querySelectorAll("div.KambiBC-event-participants__name--team-logo");
            const quotaElements = document.querySelectorAll('div.eMQclt');
            const teams = Array.from(teamsElements).map(element => element.innerText);
            const quotas = Array.from(quotaElements).map(element => element.innerText);
            console.log("Teams:", teams);
            console.log("Quotas:", quotas);
            return teams.map((team, i) => ({ team, quota: quotas[i] }));
        });

        console.log("Resultados de la primera página:", result);
        return result;
    } catch (error) {
        console.error('Ocurrió un error al obtener los datos de la primera página:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Función para obtener datos de la segunda página
export async function getDataFromSecondPage() {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: 'C:\\Users\\hanne\\Slimjet\\slimjet.exe',
        userDataDir: 'C:\\Users\\hanne\\AppData\\Local\\Slimjet\\User Data\\Persona 1'
    });

    try {
        const page = await browser.newPage();

        // Configura la interceptación de solicitudes para evitar cargar imágenes y hojas de estilo
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort();
            } else {
                req.continue();
            }
        });

        // Navega a la segunda página y espera los selectores
        await page.goto('https://www.rushbet.co/?page=sportsbook&group=1000093652&type=matches', { timeout: 180000 });
        await page.waitForSelector("div.sc-dovDVA.ckPsfI");
        await page.waitForSelector('li.sc-bYXICO.fCeFYa');

        // Extrae datos de la página
        const result = await page.evaluate(() => {
            const teamsElements = document.querySelectorAll("div.sc-dovDVA.ckPsfI");
            const quotaElements = document.querySelectorAll('li.sc-bYXICO.fCeFYa');
            const teams = Array.from(teamsElements).map(element => element.innerText);
            const quotas = Array.from(quotaElements).map(element => element.innerText);
            console.log("Teams:", teams);
            console.log("Quotas:", quotas);
            return teams.map((team, i) => ({ team, quota: quotas[i] }));
        });

        console.log("Resultados de la segunda página:", result);
        return result;
    } catch (error) {
        console.error('Ocurrió un error al obtener los datos de la segunda página:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
