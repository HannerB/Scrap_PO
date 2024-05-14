import puppeteer from 'puppeteer'

async function openWebPage(){
    const browser = await puppeteer.launch({
        headless: false
    })
    const page  = await  browser.newPage()
    
    await page.goto('https://example.com')
    await browser.close() 
}

// openWebPage()

async function getDataFromWebPage(){
    const browser = await puppeteer.launch({
        headless: true, // Modificado a true para que no se abra el navegador
        executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Ruta al ejecutable de Microsoft Edge
        slowMo:70
    })
    const page  = await  browser.newPage()

    // Desactivar la carga de imágenes y hojas de estilo
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() == 'image' || req.resourceType() == 'stylesheet'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    await page.goto('https://betplay.com.co/apuestas#sports-hub/basketball/nba')

    // Espera a que los elementos específicos aparezcan en la página
    await page.waitForSelector("div.KambiBC-event-participants__name--team-logo")
    await page.waitForSelector('div.eMQclt')

    const result = await page.evaluate(() =>{
        const teamsElement = document.querySelector("div.KambiBC-event-participants__name--team-logo")
        const quotaElement = document.querySelector('div.eMQclt')
        const teams = teamsElement ? teamsElement.innerText : 'No se encontró el título'
        const quota = quotaElement ? quotaElement.innerText : 'No se encontraron los equipos'
        return {teams, quota} // Devuelve el título y los equipos
    })

    console.log(result) // Imprime el resultado

    await browser.close() // Cierra el navegador después de obtener los datos
}

getDataFromWebPage()
