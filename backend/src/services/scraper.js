const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class Scraper {
    constructor(url) {
        this.url = url;
        this.browser = null;
        this.page = null;
        this.scrapedData = [];
    }

    async initialize() {

        /* * Launch the borweser in the new headless mode */
        this.browser = await puppeteer.launch({headless: 'new'});

        this.page = await this.browser.newPage();

        /* * Adjust the page size */
        await this.page.setViewport({
            width: 1200,
            height: 800
        });

        this.page.setDefaultNavigationTimeout(10 * 1000);
    }

    async scrapeData() {
        /* * Navigates the page to the given URL. */
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });


        /* * Navigates to the targeted page. */
        await this.navigateToTargetedPage();


        /* * Extract the categories URLs. */
        const categoryUrls = await this.page.$$eval('.row._no-g.-tac .col', (aTags) => {
            return aTags.slice(1, 4).map((aTag) => aTag.href);
        });


        /* * Collect the names of the categories. */
        this.scrapedData = await this.page.$$eval('.row._no-g.-tac .col', (columns) => {
            return columns.slice(1, 4).map((column) => {
                const categoryName = column.querySelector('p')?.innerText;
        
                return {
                    category_name: categoryName,
                    products: [],
                };
            });
        });


        /* * Collect the products for each category URL. */
        await this.getCategoryProducts(categoryUrls);


        return this.scrapedData;
    }

    async close() {
        await this.browser?.close();
    }



    /*********** Utility functions ***********/

    async navigateToTargetedPage() {

        await this.clickAndWait('.cw .cls', '.flyout .itm:first-child');
        await this.clickAndWait('.flyout .itm:first-child', '.ar .-rad4');
        await this.clickAndWait('.ar .-rad4', '.row._no-g.-tac .col');

    }

    async clickAndWait(currentSelct, nextSelect) {

        await this.page.click(currentSelct);
        try {
          await this.page.waitForSelector(nextSelect, { timeout: 5000 });
        } catch(error) {
            console.error( 'error waitForSelector: ' + nextSelect );
        }	
    }

    async getCategoryProducts (categoryUrls) {

        /* * Create 3 newPage instances */
        const pagePromises = Array.from({ length: 3 }, () => {
            return this.browser.newPage();
        });
        const pages = await Promise.all(pagePromises);


        /* * Navigate to each products page */
        await Promise.all(categoryUrls.map(async (url, index) => {

            await pages[index].goto(url, { waitUntil: 'domcontentloaded' });

            /* * Take a screenshot of the page */
            // this.takeScreenshot(pages[index], url)


            /* * Collect products details in the page */
            await this.getProducts(pages[index], index);
        }))
    }
    async getProducts(page, index) {
        const productInfo = await page.$$eval('article.prd', (products) => {
            return products.map((product) => {
                const productATag = product.querySelector('.prd a.core');
                const productImg = product.querySelector('.prd .core .img-c .img');
                const productPrice = product.querySelector('.core .prc');
                const productOldPrice = product.querySelector('.s-prc-w .old');
                const productPriceDsct = product.querySelector('.s-prc-w ._dsct');

                const productInfo = {
                    url: productATag?.href || null,
                    name: productATag?.dataset?.name || null,
                    brand: productATag?.dataset?.brand || null,
                    images: productImg?.dataset?.src || null,
                    price: productPrice?.innerText || null,
                    old_price: productOldPrice?.innerText || null,
                    price_discount: productPriceDsct?.innerText || null,
                };

                return productInfo;

            });
        });
        this.scrapedData[index].products.push(...productInfo);
    }
    async takeScreenshot(page, url) {

         const sanitizedUrl = url.replace(/[^a-z0-9]/gi, '_');
         const screenshotFolderPath = path.join(global.rootDir, 'public');
         const screenshotFilePath = path.join(screenshotFolderPath, `${sanitizedUrl}.png`);
         await fs.mkdir(screenshotFolderPath, { recursive: true });
         await page.screenshot({path: screenshotFilePath, fullPage: true})
    }
}



async function runScraper() {
    
    const urlToScrape = 'https://www.jumia.ma/';
    let scraper;
    try {

        /* * Create an instance of Scraper */
        scraper = new Scraper(urlToScrape);
        
        console.log("runScraper: initialize the Scraper.")
        await scraper.initialize();
        
        console.log("runScraper: Scrape the data.")
        const scrapedData = await scraper.scrapeData();
        
        console.log("runScraper: Store the data.")
        const outputFolderPath = path.join(global.rootDir, 'data');
        const outputFilePath = path.join(outputFolderPath, "scraped-data.json");
        await fs.mkdir(outputFolderPath, { recursive: true });
        await fs.writeFile(outputFilePath, JSON.stringify(scrapedData, null, 2), 'utf-8');
        
        await scraper.close();

    } catch (error) {

        await scraper?.close();
        console.error('Error during scraping:', error);
    }
}

module.exports = runScraper;