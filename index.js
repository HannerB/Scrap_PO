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
        headless: true,
        // slowMo:70
    })
    const page  = await  browser.newPage()

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if(req.resourceType() == 'image' || req.resourceType() == 'stylesheet'){
            req.abort();
        }
        else {
            req.continue();
        }
    });

    try {
        await page.goto('https://betplay.com.co/apuestas#sports-hub/basketball/nba', {timeout: 90000}); // Timeout of 60 seconds
    } catch (error) {
        console.error(error);
    }

    await page.waitForSelector("div.KambiBC-event-participants__name--team-logo")
    await page.waitForSelector('div.eMQclt')

    const result = await page.evaluate(() =>{
        const teamsElements = document.querySelectorAll("div.KambiBC-event-participants__name--team-logo")
        const quotaElements = document.querySelectorAll('div.eMQclt')
        const teams = Array.from(teamsElements).map(element => element.innerText)
        const quotas = Array.from(quotaElements).map(element => element.innerText)
        return teams.map((team, i) => ({team, quota: quotas[i]}))
    })

    console.log(result)

    await browser.close()
}

getDataFromWebPage()

