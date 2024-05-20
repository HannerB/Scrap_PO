import { launchBrowser, extractDataFromPage } from '../utils/browser.js';

export const fetchScrapData = async (fetchFirstPage, fetchSecondPage) => {
    const results = [];

    if (fetchFirstPage) {
        const data1 = await getDataFromPage(
            'https://betplay.com.co/apuestas#sports-hub/basketball/nba',
            'div.KambiBC-event-participants__name--team-logo',
            'div.eMQclt'
        );
        results.push(...data1.map(data => ({ firstPageData: data })));
    }

    if (fetchSecondPage) {
        const data2 = await getDataFromPage(
            'https://www.rushbet.co/?page=sportsbook&group=1000093652&type=matches',
            'div.sc-iUIdfH.eZBNex',
            'li.sc-iPbnTF.fPkrAH'   
        );
        data2.forEach((data, index) => {
            if (results[index]) {
                results[index].secondPageData = data;
            } else {    
                results.push({ secondPageData: data });
            }
        });
    }

    return results;
};

const getDataFromPage = async (url, teamSelector, quotaSelector) => {
    let browser;
    try {
        browser = await launchBrowser();
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet') {
                req.abort();
            } else {
                req.continue();
            }
        });

        return await extractDataFromPage(page, url, teamSelector, quotaSelector);
    } catch (error) {
        console.error(`Error al obtener los datos de la página ${url}:`, error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};
