const puppeteer = require('puppeteer');

async function captureScreenshot(url, darkMode) {
    try {
        // Capture the screenshot
        const browser = await puppeteer.launch({headless:"new"});
        const page = await browser.newPage();
        const timeout = 5000;
        await page.goto(url);
        await page.setViewport({width: 2160, height: 1920});
        await waitTillHTMLRendered(page)
        if (darkMode === 'true') {
            {
                const targetPage = page;
                await puppeteer.Locator.race([
                    targetPage.locator('div.map-settings span'),
                    targetPage.locator('::-p-xpath(/html/body/app-root/div/app-ski-area/div/div/div/npl-map-libre/div/div/div[3]/button/span)'),
                    targetPage.locator(':scope >>> div.map-settings span')
                ])
                    .setTimeout(timeout)
                    .click({
                    offset: {
                        x: 16,
                        y: 5.5,
                    },
                    });
            }
            {
                const targetPage = page;
                await puppeteer.Locator.race([
                    targetPage.locator('::-p-aria(Dark) >>>> ::-p-aria([role=\\"image\\"])'),
                    targetPage.locator('button:nth-of-type(2) > ion-img >>>> img'),
                    targetPage.locator(':scope >>> button:nth-of-type(2) > ion-img >>>> :scope >>> img')
                ])
                    .setTimeout(timeout)
                    .click({
                    offset: {
                        x: 39,
                        y: 34,
                    },
                    });
            }
            {
                const targetPage = page;
                await puppeteer.Locator.race([
                    targetPage.locator('div.map-settings > div > span'),
                    targetPage.locator('::-p-xpath(/html/body/app-root/div/app-ski-area/div/div/div/npl-map-libre/div/div/div[3]/div/span)'),
                    targetPage.locator(':scope >>> div.map-settings > div > span')
                ])
                    .setTimeout(timeout)
                    .click({
                    offset: {
                        x: 8,
                        y: 10,
                    },
                    });
            }
            await delay(2000);
        }
        
        const map = await page.$('body > app-root > div > app-ski-area > div > div > div');
        const screenshot = await map.screenshot();
        await browser.close();
        return screenshot;
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        throw error;
    }
}

const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while(checkCounts++ <= maxChecks){
      let html = await page.content();
      let currentHTMLSize = html.length; 
  
      let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);
  
      console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);
  
      if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
        countStableSizeIterations++;
      else 
        countStableSizeIterations = 0; //reset the counter
  
      if(countStableSizeIterations >= minStableSizeIterations) {
        console.log("Page rendered fully..");
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitForTimeout(checkDurationMsecs);
    }  
  };

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));


module.exports = { captureScreenshot };
